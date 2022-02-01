import { open, closed } from '../repositories/repoisitory';
import dao from '../repositories/dao';
import { handleVerification } from '../utils/hooks';

const bcrypt = require('bcrypt');
const saltRounds = 10;

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
    let user = await closed.getUserMe(req.user_id);
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

export const deleteUser = async (req, res) => {
    let user = await open.getUserById(req.user_id);
    if(!user) {
        return res.status(400).send({ status: 'fail', message: 'Could not find the user that you are trying to find.' });
    }
    await closed.deleteUserById(user.user_id);

    return res.status(200).send({ status: 'success', message: 'Your account has been deleted successfully' });
}

export const updateUser = async (req, res) => {
    let user = await closed.getUserById(req.user_id);
    if(!user) {
        return res.status(400).send({ status: 'fail', message: 'Could not find the user that you are trying to find.' });
    }

    for(let key in req.body) {
        if(key in user) {
            if(key == 'description' && req.body[key].length > 320) {
                return res.status(400).send({ status: 'fail', data: user, message: 'Bio max character count of 320' });
            }

            if(key == 'email') {
                await closed.setUserVerified(user.user_id, 0);
                handleVerification(user.user_id, req.body[key]);
            }

            if(key == 'username') {
                const user = await closed.getUserByUsername(req.body[key]);
                if(user) {
                    return res.status(400).send({ status: 'fail', data: user, message: 'That username is already in use' });
                }
            }

            if(key == 'password') {
                const match = await bcrypt.compare(req.body.password.current, user.password);
                if(!match) {
                    return res.status(400).send({ status: 'fail', data: user, message: 'Incorrect current password entered' });
                }

                bcrypt.hash(req.body.password.new, saltRounds, async (err, hash) => {
                    if(!err) {
                        await closed.updatePassword(user.user_id, hash);
                    } else {
                        return res.status(400).send({ status: 'fail', data: user, message: 'Changing password failed' });
                    }
                });

                await closed.logoutUserSessions(user.user_id);
            }

            // https://stackoverflow.com/questions/4059147/check-if-a-variable-is-a-string-in-javascript
            if(typeof req.body[key] === 'string' || req.body[key] instanceof String) {
                if(req.body[key].replace(/\s/g,'') == '' && key !== 'description') {
                    return res.status(400).send({ status: 'fail', data: user, message: 'Please provide non-blank information' });
                }
            }


            user[key] = req.body[key];
        }
    }

    await closed.updateUser(user.user_id, user.username, user.email, user.first_name, user.last_name, user.description);
    
    return res.status(200).send({ status: 'success', data: user, message: 'Your account has been updated successfully' });
}