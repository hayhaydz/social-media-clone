import { newComment, removeComment } from '../controllers/postComments.controller';
import * as express from 'express';
const router = express.Router();

router.post('/:id/comment', newComment);
router.delete('/:id/comment/:commentID', removeComment);


module.exports = router;