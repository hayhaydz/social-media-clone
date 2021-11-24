import { open } from '../repositories/repoisitory';
import dao from '../repositories/dao';

export const getUserByUsername = async (req, res) => {
    let user = await open.getUserByUsername(req.params.username);
    let userProfile = await open.getUserProfileById(user.user_id);

    return res.status(200).send({ status: 'success', ...user,  ...userProfile });
}

export const getUserById = async (req, res) => {
    let user = await open.getUserById(req.params.id);
    let userProfile = await open.getUserProfileById(user.user_id);

    return res.status(200).send({ status: 'success', ...user,  ...userProfile });
}

export const getUserMe = async (req, res) => {
    let user = await open.getUserById(req.user_id);
    let userProfile = await open.getUserProfileById(user.user_id);

    return res.status(200).send({ status: 'success', ...user,  ...userProfile });
}