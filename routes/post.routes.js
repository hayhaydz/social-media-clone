import { getPosts, getPostById, newPost, updatePost, removePost } from '../controllers/post.controller';
import * as express from 'express';
const router = express.Router();

router.get('/', getPosts);
router.post('/new', newPost);
router.patch('/:id', updatePost);
router.get('/:id', getPostById);
router.delete('/:id', removePost);


module.exports = router;