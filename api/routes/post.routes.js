import { getPosts, getPostById, newPost } from '../controllers/post.controller';
import * as express from 'express';
const router = express.Router();

router.get('/', getPosts);
router.get('/:id', getPostById);
router.post('/new', newPost);

module.exports = router;