import { getPosts, getPostById, newPost, updatePost, removePost } from '../controllers/post.controller';
import crypto from 'crypto';
import * as express from 'express';
const router = express.Router();

import multer from 'multer';
const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './public/uploads/images/posts')
    },
    filename: function (req, file, callback) {
        callback(null, crypto.randomBytes(16).toString("hex") + '-' + file.originalname)
    }
});

const upload = multer({
    storage: storage
});

router.get('/', getPosts);
router.post('/new', upload.single('post_image'), newPost);
router.patch('/:id', upload.single('post_image'), updatePost);
router.get('/:id', getPostById);
router.delete('/:id', removePost);


module.exports = router;