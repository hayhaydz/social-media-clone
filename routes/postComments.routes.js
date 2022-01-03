import { getComments, newComment, removeComment } from '../controllers/postComments.controller';
import * as express from 'express';
const router = express.Router();

router.get('/:id/comments', getComments);
router.post('/:id/comment', newComment);
router.delete('/:id/comment/:commentID', removeComment);


module.exports = router;