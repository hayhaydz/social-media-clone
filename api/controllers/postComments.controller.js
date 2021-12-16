import { open } from '../repositories/repoisitory';
import dao from '../repositories/dao';

export const newComment = async (req, res) => {
    const { comment } = req.body;

    if(comment == null) {
        return res.status(400).send({ status: 'fail', message: 'Required comment data was missing!' });
    }

    if(comment.length > 640) {
        return res.status(400).send({ status: 'fail', message: 'Required post data was invalid. Too many characters!' });
    }

    let post = await open.getPostById(req.params.id);
    if(!post) {
        return res.status(400).send({ status: 'fail', message: 'Could not find the post you are trying to comment on' });
    }

    await open.insertPostComments(req.user_id, req.params.id, comment, Date.now()).catch(error => { console.error(error); res.status(400).send({ status: 'fail', message: 'There was an error with commenting on the post.'})});

    return res.status(200).send({ status: 'success', message: 'You have commented on the post successfully' });
}

export const removeComment = async (req, res) => {
    let post = await open.getPostById(req.params.id);
    if(!post) {
        return res.status(400).send({ status: 'fail', message: 'Could not find the post you are trying to remove the comment on' });
    }

    let comment = await open.checkPostComments(req.params.commentID);
    if(!comment) {
        return res.status(400).send({ status: 'fail', message: 'Could not find the comment you are trying to remove'});
    }
    if(post.post_id !== comment.post_id) {
        return res.status(400).send({ status: 'fail', message: 'Invalid request made for removing a comment'});
    }

    await open.removePostComments(req.params.commentID).catch(error => { console.error(error); res.status(400).send({ status: 'fail', message: 'There was an error with removing the comment.'})});

    return res.status(200).send({ status: 'success', message: 'Removed your comment on the post successfully' });
}