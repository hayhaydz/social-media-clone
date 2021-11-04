import repository from '../repositories/repoisitory';
import dao from '../repositories/dao';

export const getUserByUsername = async (req, res) => {
    let user = await repository.getUserByUsername(req.params.username);
    return res.send({ user });
}

export const getUserById = async (req, res) => {
    let user = await repository.getUserById(req.params.id);
    return res.send({ user });
}

export const getUserMe = async (req, res) => {
    let user = await repository.getUserById(req.user_id);
    return res.send({ user });
}