const express = require('express');

const app = express();
const port = 3080;
const users = [];

app.use(express.urlencoded());
app.use(express.json()); 

app.get('/api/users', (req, res) => {
    console.log('users called from api');
    console.log(users);
    res.json(users);
})

app.post('/api/user', (req, res) => {
    const user = req.body.user;
    users.push(user);
    console.log('adding a user: ' + JSON.stringify(user));
    res.json('User has been added')
})

app.get('/', (req, res) => {
    res.send('Default response');
})

app.listen(port, () => {
    console.log(`Server listening on the port::${port}`);
});