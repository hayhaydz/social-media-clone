import { open, closed } from '../repositories/repoisitory';
import dao from '../repositories/dao';

const cloudinary = require('cloudinary').v2;
const crypto = require("crypto");

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const getPosts = async (req, res) => {
    if(!req.query.page || !req.query.limit) {
        return res.status(200).send({ status: 'fail' });
    }
    let posts = await open.getPosts(req.user_id, req.query.page * req.query.limit, req.query.limit).catch(err => { console.error(err); return res.status(200).send({ status: 'fail' }) });
    if(posts.length < 1) {
        return res.status(200).send({ status: 'fail' });
    }
    Object.entries(posts);

    return res.status(200).send({ status: 'success', data: posts });
};

export const getPostsByUsername = async (req, res) => {
    if(!req.query.page || !req.query.limit) {
        return res.status(200).send({ status: 'fail' });
    }
    let posts = await open.getPostsByUsername(req.user_id, req.params.username, req.query.page * req.query.limit, req.query.limit);
    if(posts.length < 1) {
        return res.status(200).send({ status: 'fail' });
    }
    Object.entries(posts);

    return res.status(200).send({ status: 'success', data: posts });
}

export const getPostById = async (req, res) => {
    let post = await open.getPostById(req.user_id, req.params.id);
    if(!post) {
        return res.status(200).send({ status: 'fail' });
    }

    return res.status(200).send({ status: 'success', data: post });
};

export const newPost = async (req, res) => {
    const { text } = req.body;

    let filename;
    let imageID = null;
    if(req.file) {
        filename = req.file.path;
        imageID = req.file.filename.split('/')[1];
    }

    if(text == null || text.replace(/\s/g,'') == '') {
        return res.status(400).send({ status: 'fail', message: 'Required post data was missing!' });
    }

    if(text.length > 480) {
        return res.status(400).send({ status: 'fail', message: 'Required post data was invalid. Too many characters!' });
    }

    if(req.file) {
        await open.insertImage(imageID, filename).catch(error => { console.error(error); res.status(400).send({ status: 'fail', message: 'There was an error with creating a new post.'})});
    }

    let userCheck = await closed.checkUserVerified(req.user_id);
    if(!userCheck.verification) {
        return res.status(400).send({ status: 'fail', message: 'You need to verify your account before you can do that!' });
    }

    let postID = crypto.randomBytes(8).toString("hex");
    await open.insertPost(postID, req.user_id, text, imageID, Date.now()).catch(error => { console.error(error); res.status(400).send({ status: 'fail', message: 'There was an error with creating a new post.'})});

    res.status(200).send({ status: 'success', message: 'Your post was created successfully' });
};

export const updatePost = async (req, res) => {
    let { text } = req.body;

    let filename;
    let imageID = null;
    if(req.file) {
        filename = req.file.path;
        imageID = req.file.filename.split('/')[1];
    }

    let post = await open.checkPostById(req.params.id);
    if(!post) return res.status(400).send({ status: 'fail', message: 'Could not find a post with that ID.' });

    if(text == null) {
        return res.status(400).send({ status: 'fail', message: 'Required post data was missing!' });
    }

    if(req.user_id !== post.user_id) {
        return res.status(400).send({ status: 'fail', message: 'You do not have access to this post' });
    }

    console.log(req.file);
    if(text === post.text && !req.file) {
        return res.status(400).send({ status: 'fail', message: 'Post text has not changed' });
    }

    if(req.file) {
        await cloudinary.uploader.destroy(`NEEM_UPLOADS/${post.image_id}`, (error, result) => {
            if(error) {
                console.error(error); res.status(400).send({ status: 'fail', message: 'There was an error with deleting your post.'})
            }
        });
        await open.insertImage(imageID, filename).catch(error => { console.error(error); res.status(400).send({ status: 'fail', message: 'There was an error with creating a new post.'})});
        post.image_id = imageID;
    }

    await open.updatePost(req.params.id, text, post.image_id).catch(error => { console.error(error); res.status(400).send({ status: 'fail', message: 'There was an error with updating your post.'})});

    res.status(200).send({ status: 'success', message: 'Your post was updated successfully' });
}

export const removePost = async (req, res) => {
    let post = await open.checkPostById(req.params.id);
    if(!post) return res.status(400).send({ status: 'fail', message: 'Could not find a post with that ID.' });
    
    if(req.user_id !== post.user_id) {
        return res.status(400).send({ status: 'fail', message: 'You do not have access to this post' });
    }

    if(post.image_id) {
        await cloudinary.uploader.destroy(`NEEM_UPLOADS/${post.image_id}`, (error, result) => {
            if(error) {
                console.error(error); res.status(400).send({ status: 'fail', message: 'There was an error with deleting your post.'})
            }
        });
    }

    await open.deletePost(req.params.id).catch(error => { console.error(error); res.status(400).send({ status: 'fail', message: 'There was an error with deleting your post.'})});

    res.status(200).send({ status: 'success', message: 'Your post was removed successfully' });
}