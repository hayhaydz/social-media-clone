import Cookies from 'cookies';

// THIS IS A PROXY API- PUBLIC API
// PRIVATE API IS HIDDEN BEHIND SERVER SIDE RENDERING

export default async (req, res) => {
    const cookies = new Cookies(req, res);
    const headers = req ? {
        'Cookie': req.headers.cookie
    } : {}

    await fetch(`${process.env.PRIVATE_API_URL}/api/auth/logout`, {
        method: 'POST',
        credentials: 'include',
        headers: { 
            'Content-Type': 'application/json',
            ...headers
        },
    }).then((response) => {
        response.json().then(data => {
            if(data.status === 'success') {
                cookies.set('refresh_token');
                res.status(200).json({
                    status: 'success',
                    message: data.message
                });
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
