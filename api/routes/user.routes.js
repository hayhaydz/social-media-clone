import { getUserByUsername, getUserById, getUserMe, searchUsers, deleteUser, updateUser } from '../controllers/user.controller';
import * as express from 'express';
const router = express.Router();

router.get('/', getUserMe);
router.get('/search', searchUsers);
router.post('/updateUser', updateUser);
router.get('/u/:username', getUserByUsername);
router.get('/id/:id', getUserById);
router.get('/id/:id/delete', deleteUser);

module.exports = router;