import userController from '../controllers/user.controller';
import * as express from 'express';
const router = express.Router();

router.get('/', userController.getAllUsers);
router.get('/:username', userController.getUserByUsername);
router.get('/:id', userController.getUserById);

module.exports = router;