import React, { useState } from 'react';
import { login } from '../../../utils/auth';
import { post } from '../../../utils/apiHandler';
import Error from '../../Alert/Error/Error';

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
        response.json().then(async (data) => {
            if(data.status === 'success') {
                const { access_token, access_token_expiry } = data;
                await login({ access_token, access_token_expiry});
            } else {
                console.log('There was an error with logging the user in. Error message:', data.message);
                setUserData({
                    ...userData,
                    error: data.message
                })
            }
        });
    }

    return (
        <div className="p-10 card bg-base-200 max-w-md">
            <h3>Login below</h3>
            <form action="#" id="form" className="form-control" name="form" onSubmit={handleSubmit}>
                <label htmlFor="username" className="label">Username</label>
                <input 
                    type="text" 
                    id="username"
                    className="input mb-4"
                    name="username"
                    value={userData.username}
                    onChange={e =>
                        setUserData({
                            ...userData,
                            username: e.target.value
                        })
                    }
                    required
                />
                <label htmlFor="password" className="label">Password</label>
                <input 
                    type="password" 
                    id="password"
                    className="input mb-4"
                    name="password" 
                    value={userData.password}
                    onChange={e => 
                        setUserData({
                            ...userData,
                            password: e.target.value
                        })
                    }
                    required
                />  
                <button 
                    type="submit" 
                    className="btn btn-primary"
                >
                    Login
                </button>

                {userData.error && 
                    <Error text={userData.error}/>
                }
            </form>
        </div>
    )
}
export default LoginForm