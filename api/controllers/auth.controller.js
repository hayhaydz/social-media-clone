import jwt from 'jsonwebtoken';
import repository from '../repositories/repoisitory';
import dao from '../repositories/dao';
const bcrypt = require('bcrypt');
const crypto = require("crypto");
const saltRounds = 10;

const { 
    ACCESS_TOKEN_SECRET = 'secret',
    REFRESH_TOKEN_SECRET = 'secret'
} = process.env;

const encodeAccessToken = (tokenData) => {
    return jwt.sign(tokenData, ACCESS_TOKEN_SECRET, { expiresIn: '5m' });
}

const encodeRefreshToken = (tokenData) => {
    return jwt.sign(tokenData, REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
}

const decodeToken = (token) => {
    return jwt.verify(token, ACCESS_TOKEN_SECRET, (err, decoded) => {
        if(!err) {
            return decoded;
        }
    });
}

const tokenHandling = async (user, res) => {
    const accessToken = encodeAccessToken({ user_id: user.user_id });
    const refreshToken = encodeRefreshToken({ user_id: user.user_id });
    let date = new Date();
    date.setDate(date.getDate() + 7);
    await repository.insertToken(user.user_id, refreshToken, Date.now(), Math.floor(date.getTime() / 1000), result => {
        console.log(result);
    })
    .catch(err => {
        console.error(err);
    });
    return res.json({ accessToken: accessToken, refreshToken: refreshToken });
}

export const authMiddleware = async (req, res, next) => {
    const token = req.header('Access-Token');
    if(!token) {
        return next();
    }

    try {
        const decoded = decodeToken(token);
        if(!decoded) return errorMessage(res, 'Invalid access token provided');
        const { user_id } = decoded;
        const user = await repository.getUserById(user_id);
        if(user) {
            req.user_id = user_id;
        }
    } catch (e) {
        console.error(e);
        return next();
    }
    next();
}

export const authenticated = (req, res, next) => {
    if(req.user_id) {
        return next();
    }

    res.status(401);
    res.json({ error: 'User is not authenticated' });
}

const errorMessage = (res, msg) => {
    res.status(401);
    return res.json({ error: msg });
}

export const refresh = async (req, res) => {
    const refreshToken = req.body.token;
    if(refreshToken == null) return errorMessage(res, 'A token must be provided');
    let promise = await repository.checkToken(refreshToken);
    if(promise == null) return errorMessage(res, 'Invalid token provided');
    jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err, user) => {
        if(err) return res.sendStatus(403);
        const accessToken = encodeAccessToken({ user_id: user.user_id });
        res.json({ accessToken: accessToken });
    })
    res.status(200);
}

export const login = async (req, res) => {
    const { username, email, password } = req.body;

    let user;
    if(username !== undefined) {
        user = await repository.getUserByUsername(username);
    } else if (email !== undefined) {
        user = await repository.getUserByEmail(email);
    }
    
    if(!user) {
        return errorMessage(res, 'Invalid username or password');
    }

    bcrypt.compare(password, user.password, async (err, result) => {
        if(result) {
            const userToken = await repository.getUserIdToken(user.user_id);
            if(!userToken) {
                return tokenHandling(user, res);
            } else {
                await repository.delUserToken(user.user_id).then((result) => {
                    return tokenHandling(user, res);
                }).catch(err => { console.log(err); return errorMessage(res, 'Logging user in failed'); })
            }
        } else {
            return errorMessage(res, 'Invalid username or password');
        }
    });
    res.status(200);
}

export const register = async (req, res) => {
    const {
        username,
        email,
        password,
        first_name,
        last_name
    } = req.body;

    if(username == null || email == null || password == null || first_name == null || last_name == null) {
        return errorMessage(res, 'Registration data is missing');
    }

    const user = await repository.getUserByUsername(username);
    if(user) {
        return errorMessage(res, 'Username is already in use');
    }

    bcrypt.hash(password, saltRounds, async (err, hash) => {
        if(!err) {
            let userID = crypto.randomBytes(16).toString("hex");
            repository.insertUser(userID, username, email, hash).then((result) => {
                repository.insertUserProfile(userID, first_name, last_name).then((result) => {
                    console.log('New user has been added to the database');
                    return res.json({ message: 'User has been registered successfully' });
                }).catch(err => { console.log(err); return errorMessage(res, 'Registering user failed');});
            }).catch(err => { console.log(err); return errorMessage(res, 'Registering user failed'); });
        } else {
            return errorMessage(res, 'Registering user failed');
        }
    });
    res.status(200);
}