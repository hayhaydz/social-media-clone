import React, { useState } from 'react';
import { login } from '../../../utils/auth';
import { post } from '../../../utils/apiHandler';

const LoginForm = () => {
    const [userData, setUserData] = useState({ username: '', password: '', error: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUserData({
            ...userData,
            error: ''
        });

        const { username, password } = userData;

        const response = await post({username: username, password: password}, `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`);
        response.json().then(data => {
            if(data.status === 'success') {
                const { access_token, access_token_expiry } = response.data;
                await login({ access_token, access_token_expiry});
                
                console.log(data);
            }
        })


        console.log('There was an error with logging the user in');
    }
    


    return (
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
    )
}
export default LoginForm