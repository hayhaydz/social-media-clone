import jwt from 'jsonwebtoken';
import repository from '../repositories/repoisitory';
import dao from '../repositories/dao';
const bcrypt = require('bcrypt');

const { 
    ACCESS_TOKEN_SECRET = 'secret',
    REFRESH_TOKEN_SECRET = 'secret'
} = process.env;

const encodeToken = (tokenData) => {
    let tokens = [];
    tokens.push(jwt.sign(tokenData, ACCESS_TOKEN_SECRET, { expiresIn: '60s' }));
    tokens.push(jwt.sign(tokenData, REFRESH_TOKEN_SECRET, { expiresIn: '7d' }));
    return tokens;
    // return jwt.sign(tokenData, ACCESS_TOKEN_SECRET);
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
        console.log(decoded);
        const { user_id } = decoded;
        const user = await repository.getUserById(user_id);
        if(user) {
            req.user_id = user_id;
        }
    } catch (e) {
        console.log(e);
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

const returnInvalidCredentials = (res, msg) => {
    res.status(401);
    return res.json({ error: msg });
}

export const refresh = async (req, res) => {
    const refreshToken = req.body.token;
    if(refreshToken == null) return returnInvalidCredentials(res, 'A token must be provided');
    // if(!dao.getToken(refreshToken)) return returnInvalidCredentials(res, 'Invalid token provided');
    let tokenCheck = false;
    await repository.checkToken(refreshToken, result => {
        console.log('good')
        console.log(result);
        tokenCheck = true;
    })
    .catch(err => {
        console.log('bad');
        console.log(err);
    });
    // console.log(tokenCheck);
    // jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    //     if(err) return res.sendStatus(403);
    //     const accessToken = generateAccessToken({ name: user.name });
    //     res.json({accessToken: accessToken });
    // })
    res.json({ msg: 'hello there' });
    res.status(200);
}

export const login = async (req, res) => {
    const { username, password } = req.body;
    const user = await repository.getUserByUsername(username);

    if(!user) {
        returnInvalidCredentials(res, 'Invalid username or password');
    }

    bcrypt.compare(password, user.password, async (err, result) => {
        if(result) {
            const tokens = encodeToken({ userId: user.user_id });
            let date = new Date();
            date.setDate(date.getDate() + 7);
            await repository.insertToken(user.user_id, tokens[1], Date.now(), Math.floor(date.getTime() / 1000), result => {
                console.log(result);
            })
            .catch(err => {
                console.log(err);
            });
            return res.json({ accessToken: tokens[0], refreshToken: tokens[1] });
        } else {
            return returnInvalidCredentials(res, 'Invalid username or password');
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