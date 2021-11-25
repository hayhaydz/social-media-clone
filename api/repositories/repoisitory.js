import dao from './dao';
const bcrypt = require('bcrypt');
const saltRounds = 10;

export class open {
    static async getUserByUsername(username) {
        return dao.get("SELECT user_id, username, email FROM users WHERE username =?", [username]);
    }

    static async getUserByEmail(email) {
        return dao.get("SELECT user_id, username, email FROM users WHERE email =?", [email]);
    }

    static async getUserById(id) {
        return dao.get("SELECT user_id, username, email FROM users WHERE user_id =?", [id]);
    }

    static async getUserProfileById(id) {
        return dao.get("SELECT first_name, last_name, description FROM user_profiles WHERE user_id =?", [id]);
    }

    static async getPosts() {
        return dao.all("SELECT * FROM posts");
    }

    static async getPostById(id) {
        return dao.get("SELECT * FROM posts WHERE post_id =?", [id]);
    }

    static async insertPost(id, title, content, crt) {
        return dao.run("INSERT INTO posts (user_id, title, content, date_published) VALUES (?, ?, ?, ?)", [id, title, content, crt]);
    }

    static async updatePost(id, title, content) {
        return dao.run("UPDATE posts SET title = ?, content = ? WHERE post_id = ?", [title, content, id]);
    }
}

export class closed {
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

    static async deleteToken(tkn) {
        return dao.run("DELETE FROM access WHERE token =?", [tkn]);
    }

    static async checkToken(tkn) {
        return dao.get("SELECT * FROM access WHERE token =?", [tkn]);
    }

    static async insertToken(usrid, tkn, crt, exp) {
        return dao.run("INSERT INTO access (user_id, token, created_at, expires_at) VALUES (?, ?, ?, ?)", [usrid, tkn, crt, exp]);
    }
}