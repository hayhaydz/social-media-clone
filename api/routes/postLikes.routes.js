import { toggleLike } from '../controllers/postLikes.controller';
import * as express from 'express';
const router = express.Router();

router.get('/:id/like', toggleLike);


module.exports = router;