import { open } from '../repositories/repoisitory';
import dao from '../repositories/dao';

export const getPosts = async (req, res) => {
    let posts = await open.getPosts();
    Object.entries(posts);

    return res.status(200).send({ status: 'success', data: posts });
};

export const getPostById = async (req, res) => {
    let post = await open.getPostById(req.params.id);

    return res.status(200).send({ status: 'success', data: post });
};

export const newPost = async (req, res) => {
    const { text } = req.body;

    if(text == null) {
        return res.status(400).send({ status: 'fail', message: 'Required post data was missing!' });
    }

    if(text.length > 480) {
        return res.status(400).send({ status: 'fail', message: 'Required post data was invalid. Too many characters!' });
    }

    await open.insertPost(req.user_id, text, Date.now()).catch(error => { console.error(error); res.status(400).send({ status: 'fail', message: 'There was an error with creating a new post.'})});

    res.status(200).send({ status: 'success', message: 'Your post was created successfully' });
};

export const updatePost = async (req, res) => {
    let { text } = req.body;

    let post = await open.getPostById(req.params.id);
    if(!post) return res.status(400).send({ status: 'fail', message: 'Could not find a post with that ID.' });
    if(text == null) {
        return res.status(400).send({ status: 'fail', message: 'Required post data was missing!' });
    }
    if(req.user_id !== post.user_id) {
        return res.status(400).send({ status: 'fail', message: 'You do not have access to this post' });
    }
    if(text === post.text) {
        return res.status(400).send({ status: 'fail', message: 'Post text has not changed' });
    }

    await open.updatePost(req.params.id, text).catch(error => { console.error(error); res.status(400).send({ status: 'fail', message: 'There was an error with updating your post.'})});

    res.status(200).send({ status: 'success', message: 'Your post was updated successfully' });
}

export const removePost = async (req, res) => {
    let post = await open.getPostById(req.params.id);
    if(!post) return res.status(400).send({ status: 'fail', message: 'Could not find a post with that ID.' });
    if(req.user_id !== post.user_id) {
        return res.status(400).send({ status: 'fail', message: 'You do not have access to this post' });
    }

    await open.deletePost(req.params.id).catch(error => { console.error(error); res.status(400).send({ status: 'fail', message: 'There was an error with deleting your post.'})});

    res.status(200).send({ status: 'success', message: 'Your post was removed successfully' });
}