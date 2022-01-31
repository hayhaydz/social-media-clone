import { register , login, logout, refresh, resendVerify, verify } from '../controllers/auth.controller';
import * as express from 'express';
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.post('/refresh', refresh);
router.post('/resendVerify', resendVerify);
router.get('/verify/:token', verify);


module.exports = router;