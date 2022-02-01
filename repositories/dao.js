const sqlite3 = require('sqlite3').verbose();
const db = require('../database.js');
const bcrypt = require('bcrypt');
const crypto = require("crypto");
const saltRounds = 10;

export default class {

    static all(stmt, params) {
        return new Promise((res, rej) => {
            db.all(stmt, params, (error, result) => {
                if(error) {
                    return rej(error.message);
                }
                return res(result);
            });
        })
    }

    static get(stmt, params) {
        return new Promise((res, rej) => {
            db.get(stmt, params, (error, result) => {
                if(error) {
                    return rej(error.message);
                }
                return res(result);
            });
        })
    }

    static run(stmt, params) {
        return new Promise((res, rej) => {
            db.run(stmt, params, (error, result) => {
                if(error) {
                    return rej(error.message);
                }
                return res(result);
            });
        })
    }

    //https://stackoverflow.com/questions/53299322/transactions-in-node-sqlite3
    static runBatch(stmts) {
        let results = [];
        let batch = ['BEGIN', ...stmts, 'COMMIT'];
        return batch.reduce((chain, stmt) => chain.then(res => {
            results.push(res);
            return this.run(...[].concat(stmt));
        }), Promise.resolve())
        .catch(err => this.run('ROLLBACK').then(() => Promise.reject(err +
            ' in statement #' + results.length)))
        .then(() => results.slice(2));
    }

    static async setupDbForDev() {
        db.serialize(() => {
            const stmts = [
                `CREATE TABLE IF NOT EXISTS users (
                    user_id BLOB PRIMARY KEY UNIQUE,
                    username TEXT UNIQUE,
                    email TEXT UNIQUE,
                    password TEXT,
                    verification INTEGER,
                    CONSTRAINT user_unique UNIQUE (user_id, username, email)
                )`,
                `CREATE TABLE IF NOT EXISTS user_profiles (
                    user_profile_id INTEGER PRIMARY KEY AUTOINCREMENT,
                    user_id BLOB,
                    first_name TEXT,
                    last_name TEXT,
                    description TEXT,
                    FOREIGN KEY(user_id) REFERENCES users(user_id) ON DELETE CASCADE
                )`,
                `CREATE TABLE IF NOT EXISTS access (
                    access_id INTEGER PRIMARY KEY AUTOINCREMENT, 
                    user_id BLOB,
                    token TEXT,
                    created_at INTEGER,
                    expires_at INTEGER,
                    FOREIGN KEY(user_id) REFERENCES users(user_id) ON DELETE CASCADE
                )`,
                `CREATE TABLE IF NOT EXISTS posts (
                    post_id INTEGER PRIMARY KEY AUTOINCREMENT, 
                    user_id BLOB,
                    text TEXT,
                    image_id BLOB,
                    date_published INTEGER,
                    FOREIGN KEY(user_id) REFERENCES users(user_id) ON DELETE CASCADE
                    FOREIGN KEY(image_id) REFERENCES post_images(image_id)
                )`,
                `CREATE TABLE IF NOT EXISTS post_images (
                    image_id BLOB PRIMARY KEY UNIQUE,
                    filename TEXT,
                    CONSTRAINT image_unique UNIQUE (image_id)
                )`,
                `CREATE TABLE IF NOT EXISTS post_likes (
                    like_id INTEGER PRIMARY KEY AUTOINCREMENT,
                    post_id INTEGER,
                    user_id BLOB,
                    committed_at INTEGER,
                    FOREIGN KEY(post_id) REFERENCES posts(post_id),
                    FOREIGN KEY(user_id) REFERENCES users(user_id) ON DELETE CASCADE
                )`,
                `CREATE TABLE IF NOT EXISTS post_comments (
                    comment_id INTEGER PRIMARY KEY AUTOINCREMENT,
                    post_id INTEGER,
                    user_id BLOB,
                    text TEXT,
                    committed_at INTEGER,
                    FOREIGN KEY(post_id) REFERENCES posts(post_id),
                    FOREIGN KEY(user_id) REFERENCES users(user_id) ON DELETE CASCADE
                )`
            ];

            this.runBatch(stmts).then(results => {
                console.log('User tables created successfully');
            }).catch(err => {
                console.error('BATCH FAILED ' + err);
            });

            db.run("PRAGMA foreign_keys = ON");

            db.get("SELECT user_id FROM users WHERE username =?", ['foo'], (err, res) => {
                if(!res) {
                    let password = '123';
                    bcrypt.hash(password, saltRounds, ((err, hash) => {
                        if(!err) {
                            let userID = crypto.randomBytes(16).toString("hex");
                            let currentTime = Date.now();
                            const stmts = [
                                `INSERT INTO users (user_id, username, password, verification) VALUES ('${userID}', 'foo', '${hash}', 1);`,
                                `INSERT INTO user_profiles (user_id, first_name, last_name) VALUES ('${userID}', 'foo', 'bar');`,
                                `INSERT INTO posts (user_id, text, date_published) VALUES ('${userID}', 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eius, esse excepturi maxime fugiat eveniet est quos voluptatum illum. Ullam accusamus quas itaque quasi beatae laborum repudiandae maxime minima, ex provident!', ${currentTime});`
                            ];

                            this.runBatch(stmts).then(results => {
                                console.log('User tables filled successfully');
                            }).catch(err => {
                                console.error('BATCH FAILED ' + err);
                            });
                        } else {
                            console.log('Error with initial user setup');
                        }
                    }).bind(this));
                } else {
                    console.log('Initial user already exists in database');
                }
            });


        });
        // db.close();
    }
}