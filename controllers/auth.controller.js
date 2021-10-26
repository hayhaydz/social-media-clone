import jwt from 'jsonwebtoken';
import repository from '../repositories/repoisitory';
const bcrypt = require('bcrypt');

const { 
    ACCESS_TOKEN_SECRET = 'secret',
    REFRESH_TOKEN_SECRET = 'secret'
} = process.env;

const encodeToken = (tokenData) => {
    // return jwt.sign(tokenData, ACCESS_TOKEN_SECRET, { expiresIn: '60s' });
    return jwt.sign(tokenData, ACCESS_TOKEN_SECRET);
}

const decodeToken = (token) => {
    return jwt.verify(token, ACCESS_TOKEN_SECRET);
}

export const authMiddleware = async (req, res, next) => {
    const token = req.header('Access-Token');
    if(!token) {
        return next();
    }

    try {
        const decoded = decodeToken(token);
        const { userId } = decoded;
        const user = await repository.getUserById(userId);
        if(user) {
            req.userId = userId;
        }
    } catch (e) {
        return next();
    }
    next();
}

export const authenticated = (req, res, next) => {
    if(req.userId) {
        return next();
    }

    res.status(401);
    res.json({ error: 'User is not authenticated' });
}

const returnInvalidCredentials = (res) => {
    res.status(401);
    return res.json({ error: 'Invalid username or password' });
}

export const login = async (req, res) => {
    const { username, password } = req.body;

    const user = await repository.getUserByUsername(username);

    if(!user) {
        returnInvalidCredentials(res);
    }

    bcrypt.compare(password, user.password, (err, result) => {
        if(result) {
            const accessToken = encodeToken({ userId: user.id });
            return res.json({ accessToken });
        } else {
            return returnInvalidCredentials(res);
        }
    });
}

// let refreshTokens = [];

// app.post('/api/token', (req, res) => {
//     const refreshToken = req.body.token;
//     if(refreshToken == null) return res.sendStatus(401);
//     if(!refreshTokens.includes(refreshToken)) return res.sendStatus(403);
//     jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
//         if(err) return res.sendStatus(403);
//         const accessToken = generateAccessToken({ name: user.name });
//         res.json({accessToken: accessToken });
//     })
// })

// app.delete('/api/logout', (req, res) => {
//     refreshTokens = refreshTokens.filter(token => token !== req.body.token);
//     res.sendStatus(204)
// })

// app.post('/api/login', (req, res) => {
//     const { username }  = req.body;
//     const user = { name: username };

//     const accessToken = generateAccessToken(user);
//     const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
//     refreshTokens.push(refreshToken);
//     res.json({ accessToken: accessToken, refreshToken: refreshToken });
// })

// const authenticateToken = (req, res, next) => {
//     const authHeader = req.headers['authorization'];
//     const token = authHeader && authHeader.split(' ')[1];
//     if(token == null) return res.sendStatus(401);

//     jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
//         if(err) return res.sendStatus(403);
//         req.user = user;
//         next();
//     })
// }