
// THIS IS A PROXY API- PUBLIC API
// PRIVATE API IS HIDDEN BEHIND SERVER SIDE RENDERING

export default async (req, res) => {
    const data = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        first_name: req.body.first_name,
        last_name: req.body.last_name
    }

    await fetch(`${process.env.PRIVATE_API_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then((response) => {
        response.json().then(data => {
            if(data.status === 'success') {
                res.status(200).json({
                    status: 'success',
                    message: 'User has been registered successfully'
                });
            } else {
                res.status(200).json(data);
            }
        });
    }).catch((err) => {
        console.log(err);
        res.status(401).json({
            status: 'fail',
            message: 'There was an error with your request!'
        });
    });
}