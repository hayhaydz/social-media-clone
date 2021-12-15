import { getUserByUsername, getUserById, getUserMe, searchUsers } from '../controllers/user.controller';
import * as express from 'express';
const router = express.Router();

router.get('/', getUserMe);
router.get('/search', searchUsers);
router.get('/:username', getUserByUsername);
router.get('/id/:id', getUserById);

module.exports = router;