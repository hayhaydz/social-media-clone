import { login, refresh } from '../controllers/auth.controller';
import * as express from 'express';
const router = express.Router();

router.post('/refresh', refresh);
router.post('/login', login);

module.exports = router;