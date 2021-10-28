require('dotenv').config();

import express from 'express';
import dao from './repositories/dao';
import { authenticated, authMiddleware } from './controllers/auth.controller';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';

const rateLimit = require('express-rate-limit');
const PORT = 3080;
export const app = express();

app.listen(PORT, () => console.log(`Server listening on the port:: ${PORT}`));
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(authMiddleware);

dao.setupDbForDev();

const apiLimiter = rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 1
});

app.use('/api/auth', apiLimiter, authRoutes);
app.use('/api/user', authenticated, userRoutes);