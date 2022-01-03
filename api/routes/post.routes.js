import { getPosts, getPostsByUsername, getPostById, newPost, updatePost, removePost } from '../controllers/post.controller';
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
router.get('/u/:username', getPostsByUsername);
router.post('/new', upload.single('post_image'), newPost);
router.get('/id/:id', getPostById);
router.patch('/id/:id', upload.single('post_image'), updatePost);
router.delete('/id/:id', removePost);


module.exports = router;