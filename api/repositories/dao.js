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
                    CONSTRAINT user_unique UNIQUE (user_id, username, email)
                )`,
                `CREATE TABLE IF NOT EXISTS user_profiles (
                    user_profile_id INTEGER PRIMARY KEY AUTOINCREMENT,
                    user_id BLOB,
                    first_name TEXT,
                    last_name TEXT,
                    description TEXT,
                    FOREIGN KEY(user_id) REFERENCES users(user_id)
                )`,
                `CREATE TABLE IF NOT EXISTS access (
                    access_id INTEGER PRIMARY KEY AUTOINCREMENT, 
                    user_id BLOB,
                    token TEXT,
                    created_at INTEGER,
                    expires_at INTEGER,
                    FOREIGN KEY(user_id) REFERENCES users(user_id)
                )`
            ];

            this.runBatch(stmts).then(results => {
                console.log('User tables created successfully');
            }).catch(err => {
                console.error('BATCH FAILED ' + err);
            });

            db.get("SELECT user_id FROM users WHERE username =?", ['foo'], (err, res) => {
                if(!res) {
                    let password = '123';
                    bcrypt.hash(password, saltRounds, ((err, hash) => {
                        if(!err) {
                            let userID = crypto.randomBytes(16).toString("hex");
                            const stmts = [
                                `INSERT INTO users (user_id, username, password) VALUES ('${userID}', 'foo', '${hash}');`,
                                `INSERT INTO user_profiles (user_id, first_name, last_name) VALUES ('${userID}', 'foo', 'bar');`
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