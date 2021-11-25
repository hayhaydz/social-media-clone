import { getPosts, getPostById, newPost, updatePost } from '../controllers/post.controller';
import * as express from 'express';
const router = express.Router();

router.get('/', getPosts);
router.post('/new', newPost);
router.patch('/:id', updatePost);
router.get('/:id', getPostById);


module.exports = router;