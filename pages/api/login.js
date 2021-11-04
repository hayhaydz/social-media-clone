import Cookies from 'cookies';

// THIS IS A PROXY LOGIN - PUBLIC API
// PRIVATE API IS HIDDEN BEHIND Sever Side Rendering

export default async (req, res) => {
    const cookies = new Cookies(req, res);
    const data = {
        username: req.body.username,
        password: req.body.password,
    };

    return fetch(`${process.env.PRIVATE_API_URL}/api/auth/login`, data).then((response) => {
        if(response.data.status === 'success') {
            cookies.set('jwt', response.data.refresh_token, {
                httpOnly: true,
                expires: response.data.refresh_token_expiry,
                sameSite: 'lax'
            });

            return res.status(200).json({
                status: 'success',
            })
        }
    })
}