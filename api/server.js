require('dotenv').config();

const express = require('express');
const md5 = require('md5');
const jwt = require('jsonwebtoken')
const app = express();

const db = require("./database.js");

const PORT = 3080;

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

// Server

// Authentication

app.listen(PORT, () => {
    console.log(`Server listening on the port::${PORT}`);
});

app.get('/', (req, res) => {
    res.json({"message": "Ok"})
});

app.use((req, res) => {
    res.status(404);
});