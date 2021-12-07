import { newLike, removeLike } from '../controllers/postLikes.controller';
import * as express from 'express';
const router = express.Router();

router.get('/:id/like', newLike);
router.delete('/:id/like', removeLike);


module.exports = router;