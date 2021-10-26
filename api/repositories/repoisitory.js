import dao from './dao';
const bcrypt = require('bcrypt');
const saltRounds = 10;

export default class {

    static async getAllUsers() {
        return await dao.all("SELECT * FROM users", []);
    }

    static async getUserByUsername(username) {
        return dao.get("SELECT * FROM users WHERE username =?", [username]);
    }

    static async getUserById(id) {
        return dao.get("SELECT * FROM users WHERE id =?", [id]);
    }
}