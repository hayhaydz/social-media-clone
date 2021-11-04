import { register , login, refresh, refreshTokenStatus } from '../controllers/auth.controller';
import * as express from 'express';
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/refresh', refresh);

refreshTokenStatus();

module.exports = router;