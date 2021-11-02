import dao from './dao';
const bcrypt = require('bcrypt');
const saltRounds = 10;

export default class {

    static async getUserByUsername(username) {
        return dao.get("SELECT * FROM users WHERE username =?", [username]);
    }

    static async getUserByEmail(email) {
        return dao.get("SELECT * FROM users WHERE email =?", [email]);
    }

    static async getUserById(id) {
        return dao.get("SELECT * FROM users WHERE user_id =?", [id]);
    }

    static async insertUser(id, usrnm, pswd, eml) {
        return dao.run("INSERT INTO users (user_id, username, email, password) VALUES (?, ?, ?, ?)", [id, usrnm, pswd, eml]);
    }

    static async insertUserProfile(id, frstnm, lstnm) {
        return dao.run("INSERT INTO user_profiles (user_id, first_name, last_name) VALUES (?, ?, ?)", [id, frstnm, lstnm]);
    }

    static async allTokens() {
        return dao.all("SELECT * FROM access");
    }

    static async getUserIdToken(id) {
        return dao.get("SELECT * FROM access WHERE user_id =?", [id]);
    }

    static async delUserToken(id) {
        return dao.run("DELETE FROM access WHERE user_id =?", [id]);
    }

    static async checkToken(tkn) {
        return dao.get("SELECT * FROM access WHERE token =?", [tkn]);
    }

    static async insertToken(usrid, tkn, crt, exp) {
        return dao.run("INSERT INTO access (user_id, token, created_at, expires_at) VALUES (?, ?, ?, ?)", [usrid, tkn, crt, exp]);
    }
}