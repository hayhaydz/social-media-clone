const sqlite3 = require('sqlite3').verbose();
const db = require('../database.js');
const bcrypt = require('bcrypt');
const crypto = require("crypto");
const saltRounds = 10;

export default class {

    static async setupDbForDev() {
        db.serialize(() => {
            const createUsersTable = `CREATE TABLE IF NOT EXISTS users (
                user_id BLOB PRIMARY KEY, 
                username TEXT UNIQUE,
                email TEXT UNIQUE,
                password TEXT,
                first_name TEXT,
                last_name TEXT,
                CONSTRAINT user_unique UNIQUE (username, email)
            )`;
            db.run(createUsersTable);

            const createAccessTable = `CREATE TABLE IF NOT EXISTS access (
                access_id INTEGER PRIMARY KEY AUTOINCREMENT, 
                user_id INTEGER,
                token TEXT,
                created_at INTEGER,
                expires_at INTEGER,
                FOREIGN KEY(user_id) REFERENCES users(user_id)
                )`;
            db.run(createAccessTable);

            db.get("SELECT user_id FROM users WHERE username =?", ['foo'], (err, res) => {
                if(!res) {
                    let password = '123';
                    bcrypt.hash(password, saltRounds, (err, hash) => {
                        if(!err) {
                            const insertUsers = `INSERT INTO users (user_id, username, password) VALUES ('${crypto.randomBytes(16).toString("hex")}', 'foo', '${hash}');`;
                            db.run(insertUsers);
                        } else {
                            console.log('Error with initial user setup');
                        }
                    });
                } else {
                    console.log('Initial user already exists in database');
                }
            });


        });
        // db.close();
    }

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
}