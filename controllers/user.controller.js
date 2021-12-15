import { open } from '../repositories/repoisitory';
import dao from '../repositories/dao';

export const getUserByUsername = async (req, res) => {
    let user = await open.getUserByUsername(req.params.username);
    if(!user) {
        return res.status(400).send({ status: 'fail', message: 'Could not find the user that you are trying to find.' });
    }

    return res.status(200).send({ status: 'success', data: user });
}

export const getUserById = async (req, res) => {
    let user = await open.getUserById(req.params.id);
    if(!user) {
        return res.status(400).send({ status: 'fail', message: 'Could not find the user that you are trying to find.' });
    }

    return res.status(200).send({ status: 'success', data: user });
}

export const getUserMe = async (req, res) => {
    let user = await open.getUserById(req.user_id);
    if(!user) {
        return res.status(400).send({ status: 'fail', message: 'Could not find the user that you are trying to find.' });
    }

    return res.status(200).send({ status: 'success', data: user });
}

// https://stackoverflow.com/questions/58711245/how-to-build-a-search-bar-using-nodejs-and-sql-as-the-database
export const searchUsers = async (req, res) => {
    let users = await open.searchUsers('%' + req.query.q + '%');
    if(users.length < 1) {
        return res.status(400).send({ status: 'fail', message: 'Could not find any users from your search parameters.' });
    }
    Object.entries(users);

    return res.status(200).send({ status: 'success', data: users });
}