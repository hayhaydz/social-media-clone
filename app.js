require('dotenv').config();

import express from 'express';
import dao from './repositories/dao';
import { authenticated, authMiddleware } from './controllers/auth.controller';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';

const PORT = 3080;
export const app = express();

app.listen(PORT, () => console.log(`Server listening on the port:: ${PORT}`));
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(authMiddleware);

dao.setupDbForDev();

app.use('/api/auth', authRoutes);
app.use('/api/user', authenticated, userRoutes);