import { getPosts, getPostsByUsername, getPostById, newPost, updatePost, removePost } from '../controllers/post.controller';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import * as express from 'express';
import multer from 'multer';

const cloudinary = require('cloudinary').v2;
const router = express.Router();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "NEEM_UPLOADS",
    },
});

const upload = multer({ storage: storage });

router.get('/', getPosts);
router.get('/u/:username', getPostsByUsername);
router.post('/new', upload.single('post_image'), newPost);
router.get('/id/:id', getPostById);
router.post('/id/:id', upload.single('post_image'), updatePost);
router.delete('/id/:id', removePost);

module.exports = router;