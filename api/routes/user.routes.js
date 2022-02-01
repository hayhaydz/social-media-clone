import { getUserByUsername, getUserById, getUserMe, searchUsers, deleteUser, updateUser } from '../controllers/user.controller';
import * as express from 'express';
const router = express.Router();

router.get('/', getUserMe);
router.get('/search', searchUsers);
router.post('/update', updateUser);
router.post('/delete', deleteUser);
router.get('/u/:username', getUserByUsername);
router.get('/id/:id', getUserById);

module.exports = router;