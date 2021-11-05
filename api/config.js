require('dotenv').config();

exports.ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
exports.REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

exports.ACCESS_TOKEN_EXPIRES = process.env.ACCESS_TOKEN_EXPIRES || 15;
exports.REFRESH_TOKEN_EXPIRES = process.env.REFRESH_TOKEN_EXPIRES || (60*24*30);