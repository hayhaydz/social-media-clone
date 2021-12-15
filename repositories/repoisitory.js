import dao from './dao';

export class open {
    static async getUserByUsername(username) {
        return dao.get(`
            SELECT 
                users.user_id, 
                users.username, 
                users.email,
                user_profiles.first_name,
                user_profiles.last_name,
                user_profiles.description 
            FROM users
            JOIN user_profiles ON user_profiles.user_id = users.user_id 
            WHERE users.username = ?
        `, [username]);
    }

    static async getUserById(id) {
        return dao.get(`
            SELECT 
                users.user_id, 
                users.username, 
                users.email,
                user_profiles.first_name,
                user_profiles.last_name,
                user_profiles.description 
            FROM users
            JOIN user_profiles ON user_profiles.user_id = users.user_id 
            WHERE users.user_id = ?
        `, [id]);
    }

    static async searchUsers(username) {
        return dao.all(`
            SELECT
                users.user_id,
                users.username,
                user_profiles.first_name,
                user_profiles.last_name
            FROM 
            users 
            JOIN user_profiles ON user_profiles.user_id = users.user_id 
            WHERE users.username LIKE ?
        `, [username]);
    }

    static async getPosts(userID) {
        return dao.all(`
            SELECT 
                posts.post_id, 
                posts.user_id, 
                posts.text, 
                posts.date_published, 
                user_profiles.first_name, 
                user_profiles.last_name, 
                users.username, 
                post_images.filename, 
                (SELECT COUNT(*) FROM post_likes WHERE post_likes.post_id = posts.post_id) AS total_likes,
                (SELECT COUNT(*) FROM post_likes WHERE post_likes.post_id = posts.post_id AND post_likes.user_id = ?) AS is_liked_by_user
            FROM posts 
            JOIN user_profiles ON user_profiles.user_id = posts.user_id 
            JOIN users ON users.user_id = posts.user_id LEFT 
            JOIN post_images ON post_images.image_id = posts.image_id 
            ORDER BY posts.post_id DESC
        `, [userID]);
    }

    static async getPostsByUsername(userID, username) {
        return dao.all(`
            SELECT 
                posts.post_id, 
                posts.user_id, 
                posts.text, 
                posts.date_published, 
                user_profiles.first_name, 
                user_profiles.last_name, 
                users.username, 
                post_images.filename, 
                (SELECT COUNT(*) FROM post_likes WHERE post_likes.post_id = posts.post_id) AS total_likes,
                (SELECT COUNT(*) FROM post_likes WHERE post_likes.post_id = posts.post_id AND post_likes.user_id = ?) AS is_liked_by_user
            FROM posts 
            JOIN user_profiles ON user_profiles.user_id = posts.user_id 
            JOIN users ON users.user_id = posts.user_id LEFT 
            JOIN post_images ON post_images.image_id = posts.image_id 
            WHERE users.username = ?
            ORDER BY posts.post_id DESC`
        , [userID, username]);
    }

    static async getPostById(userID, postID) {
        return dao.get(`
            SELECT 
                posts.post_id, 
                posts.user_id, 
                posts.text, 
                posts.date_published, 
                user_profiles.first_name, 
                user_profiles.last_name, 
                users.username, 
                post_images.filename, 
                (SELECT COUNT(*) FROM post_likes WHERE post_likes.post_id = posts.post_id) AS total_likes,
                (SELECT COUNT(*) FROM post_likes WHERE post_likes.post_id = posts.post_id AND post_likes.user_id = ?) AS is_liked_by_user
            FROM posts 
            JOIN user_profiles ON user_profiles.user_id = posts.user_id 
            JOIN users ON users.user_id = posts.user_id LEFT 
            JOIN post_images ON post_images.image_id = posts.image_id 
            WHERE post_id = ?`
        , [userID, postID]);
    }

    static async checkPostById(id) {
        return dao.get(`SELECT post_id FROM posts WHERE post_id = ?`, [id]);
    }

    static async insertPost(id, text, imageID, at) {
        return dao.run("INSERT INTO posts (user_id, text, image_id, date_published) VALUES (?, ?, ?, ?)", [id, text, imageID, at]);
    }

    static async updatePost(id, text) {
        return dao.run("UPDATE posts SET text = ? WHERE post_id = ?", [text, id]);
    }

    static async deletePost(postID) {
        return dao.run("DELETE FROM posts WHERE post_id =?", [postID]);
    }

    static async insertImage(id, filename) {
        return dao.run("INSERT INTO post_images (image_id, filename) VALUES (?, ?) ", [id, filename]);
    }

    static async removeImage(id) {
        return dao.run("DELETE FROM post_images  image_id = ?", [id]);
    }

    static async getTotalPostLikes(id) {
        return dao.get('SELECT (SELECT COUNT(*) FROM post_likes WHERE post_id = ?) AS total_likes', [id]);
    }

    static async insertPostLikes(userID, postID, at) {
        return dao.run("INSERT INTO post_likes (user_id, post_id, committed_at) VALUES (?, ?, ?)", [userID, postID, at]);
    }

    static async removePostLikes(userID, postID) {
        return dao.run("DELETE FROM post_likes WHERE user_id = ? AND post_id = ?", [userID, postID]);
    }

    static async checkPostLikes(userID, postID) {
        return dao.get("SELECT like_id FROM post_likes WHERE user_id = ? AND post_id = ?", [userID, postID]);
    }

    static async insertPostComments(userID, postID, text, at) {
        return dao.run("INSERT INTO post_comments (user_id, post_id, text, committed_at) VALUES (?, ?, ?, ?)", [userID, postID, text, at]);
    }

    static async removePostComments(id) {
        return dao.run("DELETE FROM post_comments WHERE comment_id = ?", [id]);
    }

    static async checkPostComments(id) {
        return dao.get("SELECT post_id from post_comments WHERE comment_id = ?", [id]);
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