import { open } from '../repositories/repoisitory';
import dao from '../repositories/dao';

export const toggleLike = async (req, res) => {
    let post = await open.checkPostById(req.params.id);
    if(!post) {
        return res.status(400).send({ status: 'fail', message: 'Could not find the post you are trying to like' });
    }
    let like = await open.checkPostLikes(req.user_id, req.params.id);
    let query = await open.getTotalPostLikes(req.params.id);
    if(like) {
        await open.removePostLikes(req.user_id, req.params.id, Date.now()).catch(error => { console.error(error); res.status(400).send({ status: 'fail', message: 'There was an error with liking the post.'})});
        query.total_likes--;
        return res.status(200).send({ status: 'success', data: query });
    } else {
        await open.insertPostLikes(req.user_id, req.params.id, Date.now()).catch(error => { console.error(error); res.status(400).send({ status: 'fail', message: 'There was an error with liking the post.'})});
        query.total_likes++;
        return res.status(200).send({ status: 'success', data: query });
    }
}