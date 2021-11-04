import { getUserByUsername, getUserById, getUserMe } from '../controllers/user.controller';
import * as express from 'express';
const router = express.Router();

router.get('/', getUserMe);
router.get('/:username', getUserByUsername);
router.get('/:id', getUserById);

module.exports = router;