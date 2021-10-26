import repository from '../repositories/repoisitory';
import dao from '../repositories/dao';

export default class {

    static async getAllUsers(req, res) {
        let users = await repository.getAllUsers();
        return res.send({ users });
    }

    static async getUserByUsername(req, res) {
        let user = await repository.getUserByUsername(req.params.username);
        return res.send({ user });
    }

    static async getUserById(req, res) {
        let user = await repository.getUserById(req.params.id);
        return res.send({ user });
    }
}

// app.get('/api/users', (req, res) => {
//     let sql = "select * from user";
//     let params = [];
//     db.all(sql, params, (err, rows) => {
//         if(err) {
//             res.status(400).json({"error":err.message});
//             return;
//         }
//         res.json({
//             "message": "success",
//             "data": rows
//         })
//     });
// });

// app.get('/api/user/:id', (req, res) => {
//         let sql = "select * from user where id = ?";
//         let params = [req.params.id];
//         db.get(sql, params, (err, row) => {
//             if(err) {
//                 res.status(400).json({"error":err.message});
//             }
//             res.json({
//                 "message": "success",
//                 "data": row
//             })
//         });
// });

// app.post('/api/user/', (req, res) => {
//     let errors = [];
//     if(!req.body.password) {
//         errors.push('No password specified');
//     }
//     if(!req.body.email) {
//         errors.push('No email specified');
//     }
//     if(errors.length) {
//         res.status(400).json({"error":errors.join(',')});
//         return;
//     }

//     let data = {
//         name: req.body.name,
//         email: req.body.email,
//         password: md5(req.body.password)
//     }

//     let sql = 'INSERT INTO user (name, email, password) VALUES (?, ?, ?)';
//     let params = [data.name, data.email, data.password];
//     db.run(sql, params, function (err, result) {
//         if(err) {
//             res.status(400).json({"error":err.message});
//             return;
//         }
//         res.json({
//             "message": "success",
//             "data": data,
//             "id": this.lastID
//         })
//     });
// });

// app.patch('/api/user/:id', (req, res) => {
//     let data = {
//         name: req.body.name,
//         email: req.body.email,
//         password: req.body.password ? md5(req.body.password) : null
//     }
//     // "we use COALESCE function to keep the current value if there is no new value (null)."
//     db.run(
//         `UPDATE user set
//             name = COALESCE(?, name),
//             email = COALESCE(?, email),
//             password = COALESCE(?, password)
//             WHERE id = ?`,
//         [data.name, data.email, data.password, req.params.id],
//         function (err, result) {
//             if(err) {
//                 res.status(400).json({"error": res.message})
//                 return;
//             }
//             res.json({
//                 message: "success",
//                 data: data,
//                 changes: this.changes
//             })
//     })
// });

// app.delete('/api/user/:id', (req, res) => {
//     db.run(
//         'DELETE FROM user WHERE id = ?',
//         req.params.id,
//         function (err, result) {
//             if(err) {
//                 res.status(400).json({"error": res.message});
//                 return;
//             }
//             res.json({"message": "deleted", changes: this.changes});
//         }
//     )
// })