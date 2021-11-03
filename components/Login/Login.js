import React, { useState } from 'react';
import { login } from '../../utils/auth';

const Login = ({ hostname }) => {
    const [userData, setUserData] = useState({ username: '', password: '', error: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUserData({
            ...userData,
            error: ''
        });

        const { username, password } = userData;
        const url = `${hostname}/api/auth/login`;

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ username, password })
            })
            if(response.status === 200) {
                const { access_token, access_token_expiry } = await response.json();
                login({ access_token, access_token_expiry });
            } else {
                console.log('Login has failed');
                let err = new Error(response.statusText);
                err.response = response;
                throw err;
            }
        } catch (err) {
            console.error('There was an error or you have network issues.', error);
            const { response } = error;
            setUserData(
                Object.assign({}, userData, {
                    error: response ? response.statusText : error.message
                })
            )
        }
    }
    


    return (
        <div className="login">
            <h1>Login to API</h1>
            <form action="#" id="form" name="form" onSubmit={handleSubmit}>
                <label htmlFor="username">Username</label>
                <input 
                    type="text" 
                    id="username" 
                    name="username"
                    value={userData.username}
                    onChange={e =>
                        setUserData({
                            ...userData,
                            username: e.target.value
                        })
                    }
                />
                <label htmlFor="password">Password</label>
                <input 
                    type="password" 
                    id="password" 
                    name="password" 
                    value={userData.password}
                    onChange={e => 
                        setUserData({
                            ...userData,
                            password: e.target.value
                        })
                    }
                />
                <button type="submit">Login</button>

                {userData.error && <p className="error">Error: {userData.error}</p>}
            </form>
        </div>
    )
}
export default Login