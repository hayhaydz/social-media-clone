import { open } from '../repositories/repoisitory';
import dao from '../repositories/dao';

export const getPosts = async (req, res) => {
    let posts = await open.getPosts();

    return res.status(200).send({ status: 'success', ...posts });
};

export const getPostById = async (req, res) => {
    let post = await open.getPostById(id);

    return res.status(200).send({ status: 'success', ...post });
};

export const newPost = async (req, res) => {
    
};