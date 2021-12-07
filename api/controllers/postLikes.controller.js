import { open } from '../repositories/repoisitory';
import dao from '../repositories/dao';

export const newLike = async (req, res) => {
    let post = await open.getPostById(req.params.id);
    if(!post) {
        return res.status(400).send({ status: 'fail', message: 'Could not find the post you are trying to like' });
    }
    let like = await open.checkPostLikes(req.user_id, req.params.id);
    if(like) {
        return res.status(400).send({ status: 'fail', message: 'You have already liked this post' });
    }

    await open.insertPostLikes(req.user_id, req.params.id, Date.now()).catch(error => { console.error(error); res.status(400).send({ status: 'fail', message: 'There was an error with liking the post.'})});

    return res.status(200).send({ status: 'success', message: 'You have liked the post successfully' });
}

export const removeLike = async (req, res) => {
    let post = await open.getPostById(req.params.id);
    if(!post) {
        return res.status(400).send({ status: 'fail', message: 'Could not find the post you are trying to like' });
    }
    let like = await open.checkPostLikes(req.user_id, req.params.id);
    if(!like) {
        return res.status(400).send({ status: 'fail', message: 'You have not liked this post yet' });
    }

    await open.removePostLikes(req.user_id, req.params.id, Date.now()).catch(error => { console.error(error); res.status(400).send({ status: 'fail', message: 'There was an error with liking the post.'})});

    return res.status(200).send({ status: 'success', message: 'Removed your like on the post successfully' });
}