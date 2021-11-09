import express, { json } from 'express';
import dao from './repositories/dao';
import { authenticated, authMiddleware } from './controllers/auth.controller';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import { fail } from 'assert';

const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(authMiddleware);

dao.setupDbForDev();

// const apiLimiter = rateLimit({
//     windowMs: 5 * 60 * 1000,
//     max: 1
// });

app.use('/api/auth', authRoutes);
app.use('/api/user', authenticated, userRoutes);

app.use((req, res, next) => {
    const error = new Error(`Cannot find ${req.originalUrl} on this server!`);
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500).send({
        status: 'fail',
        message: error.message || 'Internal Server Error'
    });
});

const PORT = process.env.PORT || 3080;
app.listen(PORT, () => console.log(`Server listening on the port:: ${PORT}`));