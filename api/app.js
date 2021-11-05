import express from 'express';
import dao from './repositories/dao';
import { authenticated, authMiddleware } from './controllers/auth.controller';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';

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
app.all('*', (req, res, next) => {
    next(`Cannott find ${req.originalUrl} on this server!`);
});

const PORT = process.env.PORT || 3080;
app.listen(PORT, () => console.log(`Server listening on the port:: ${PORT}`));