import { open } from '../repositories/repoisitory';
import dao from '../repositories/dao';

export const getPosts = async (req, res) => {
    let posts = await open.getPosts();

    return res.status(200).send({ status: 'success', ...posts });
};

export const getPostById = async (req, res) => {
    let post = await open.getPostById(req.params.id);

    return res.status(200).send({ status: 'success', ...post });
};

export const newPost = async (req, res) => {
    const { title, content } = req.body;

    if(title == null || content == null) {
        return res.status(400).send({ status: 'fail', message: 'Required post data was missing!' });
    }

    if(title.length > 256 || content.length > 3000) {
        return res.status(400).send({ status: 'fail', message: 'Required post data was invalid. Too many characters!' });
    }

    await open.insertPost(req.user_id, title, content, Date.now()).catch(error => { console.error(error); res.status(400).send({ status: 'fail', message: 'There was an error with creating a new post.'})});

    res.status(200).send({ status: 'success', message: 'Your post was created successfully' });
};

export const updatePost = async (req, res) => {
    let { title, content } = req.body;

    let post = await open.getPostById(req.params.id);
    if(!post) return res.status(400).send({ status: 'fail', message: 'Could not find a post with that ID.' });
    if(title == null && content == null) {
        return res.status(400).send({ status: 'fail', message: 'Required post data was missing!' });
    } else if(title == null) {
        title = post.title;
    } else if(content == null) {
        content = post.content;
    }

    await open.updatePost(req.params.id, title, content).catch(error => { console.error(error); res.status(400).send({ status: 'fail', message: 'There was an error with updating your post.'})});

    res.status(200).send({ status: 'success', message: 'Your post was updated successfully' });
}