import Cookies from 'cookies';

// THIS IS A PROXY LOGIN - PUBLIC API
// PRIVATE API IS HIDDEN BEHIND SERVER SIDE RENDERING

export default async (req, res) => {
    const cookies = new Cookies(req, res);
    const data = {
        username: req.body.username,
        password: req.body.password
    };

    await fetch(`${process.env.PRIVATE_API_URL}/api/auth/login`, {
        method: 'POST',
        credentials: 'include',
        headers: { 
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then((response) => {
        response.json().then(data => {
            if(data.status === 'success') {
                // cookies.set('refresh_token', data.refresh_token, {
                //     httpOnly: true,
                //     expires: data.refresh_token_expiry,
                //     sameSite: 'lax'
                // });

                res.setHeader('set-cookie', response.headers.get('set-cookie'));
                res.status(200).json({
                    status: 'success',
                    access_token: data.access_token,
                    access_token_expiry: data.access_token_expiry
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