import Cookies from 'cookies';

export default async (req, res) => {
    const headers = req ? {
        'Cookie': req.headers.cookie
    } : {}

    await fetch(`${process.env.PRIVATE_API_URL}/api/auth/refresh`, {
        method: 'POST',
        credentials: 'include',
        headers: { 
            'Content-Type': 'application/json',
            ...headers
        },
    }).then((response) => {
        response.json().then(data => {
            if(data.status === 'success') {
                res.status(200).json({
                    status: 'success',
                    access_token: data.access_token,
                    access_token_expiry: data.access_token_expiry
                });
            } else {
                res.status(401).json(data);
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