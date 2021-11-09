import { closed } from '../repositories/repoisitory';
import dao from '../repositories/dao';
import jwt from 'jsonwebtoken';

const bcrypt = require('bcrypt');
const crypto = require("crypto");

const {
    ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET,
    ACCESS_TOKEN_EXPIRES,
    REFRESH_TOKEN_EXPIRES
} = require('../config');
const saltRounds = 10;

export const authMiddleware = async (req, res, next) => {
    const token = req.header('Access-Token');
    if(!token) {
        return next();
    }

    try {
        const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET, (err, dec) => { if(!err) return dec });
        if(!decoded) return errorMessage(res, 'Invalid access token provided');
        const { user_id } = decoded;
        const user = await closed.getUserById(user_id);
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
    return res.json({ 
        status: 'fail',
        message: msg 
    });
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

    const user = await closed.getUserByUsername(username);
    if(user) {
        return errorMessage(res, 'Username is already in use');
    }

    bcrypt.hash(password, saltRounds, async (err, hash) => {
        if(!err) {
            let userID = crypto.randomBytes(16).toString("hex");
            closed.insertUser(userID, username, email, hash).then(() => {
                closed.insertUserProfile(userID, first_name, last_name).then(() => {
                    return res.json({ status: 'success' });
                }).catch(err => { console.log(err); return errorMessage(res, 'Registering user profile failed');});
            }).catch(err => { console.log(err); return errorMessage(res, 'Registering user failed'); });
        } else {
            return errorMessage(res, 'Registering user failed');
        }
    });

    res.status(200);
}

export const login = async (req, res) => {
    const { username, email, password } = req.body;

    let user;
    if(username !== undefined) {
        user = await closed.getUserByUsername(username);
    } else if (email !== undefined) {
        user = await closed.getUserByEmail(email);
    }
    
    if(!user) {
        return errorMessage(res, 'Invalid username or password');
    }

    const match = await bcrypt.compare(password, user.password);

    if(!match) {
        return errorMessage(res, 'Invalid username or password');
    }

    const accessToken = jwt.sign({ user_id: user.user_id }, ACCESS_TOKEN_SECRET, { expiresIn: `${ACCESS_TOKEN_EXPIRES}m` });
    const refreshToken = jwt.sign({ user_id: user.user_id }, REFRESH_TOKEN_SECRET, { expiresIn: `${REFRESH_TOKEN_EXPIRES}m` });
    let date = new Date(new Date().getTime() + (REFRESH_TOKEN_EXPIRES * 60 * 1000));

    await closed.insertToken(user.user_id, refreshToken, Date.now(), Math.floor(date.getTime() / 1000)).catch(err => {console.error(err); return errorMessage(res, 'Logging user in failed'); });

    res.cookie('refresh_token', refreshToken, {
        maxAge: REFRESH_TOKEN_EXPIRES * 60 * 1000,
        httpsOnly: true,
        secure: false
    });

    res.json({
        status: 'success',
        access_token: accessToken, 
        access_token_expiry: Math.floor(new Date().getTime() + (ACCESS_TOKEN_EXPIRES * 60 * 1000)), 
        refresh_token: refreshToken
    });

    res.status(200);
}

export const refresh = async (req, res) => {
    const refreshToken = req.cookies['refresh_token'];

    if(refreshToken == null) return errorMessage(res, 'A token must be provided');
    let promise = await closed.checkToken(refreshToken);
    if(promise == null) return errorMessage(res, 'Invalid token provided');
    
    jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err, user) => {
        if(err) return res.sendStatus(403);

        const accessToken = jwt.sign({ user_id: user.user_id }, ACCESS_TOKEN_SECRET, { expiresIn: `${ACCESS_TOKEN_EXPIRES}m` });
        res.json({
            status: 'success',
            access_token: accessToken,
            access_token_expiry: Math.floor(new Date().getTime() + (ACCESS_TOKEN_EXPIRES * 60 * 1000))
        });
    })

    res.status(200);
}