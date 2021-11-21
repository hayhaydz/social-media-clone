import React, { useState } from 'react';
import { post } from '../../../utils/apiHandler';

const RegisterForm = () => {
    const [userData, setUserData] = useState({ username: '', email: '', password: '', first_name: '', last_name: '', response: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUserData({
            ...userData,
            response: ''
        });

        const { username, email, password, first_name, last_name } = userData;

        const response = await post({username, email, password, first_name, last_name}, `${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`);
        response.json().then(async (data) => {
            setUserData({
                ...userData,
                response: data.message
            })
        })
    }

    return (
        <div className="registerForm">
            <h3>Register below</h3>
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
                    required
                />
                <label htmlFor="email">Email</label>
                <input 
                    type="email" 
                    id="email" 
                    name="email"
                    value={userData.email}
                    onChange={e =>
                        setUserData({
                            ...userData,
                            email: e.target.value
                        })
                    }
                    required
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
                    required
                />
                <label htmlFor="first_name">First Name</label>
                <input 
                    type="text" 
                    id="first_name" 
                    name="first_name"
                    value={userData.first_name}
                    onChange={e =>
                        setUserData({
                            ...userData,
                            first_name: e.target.value
                        })
                    }
                    required
                />
                <label htmlFor="last_name">Last Name</label>
                <input 
                    type="text" 
                    id="last_name" 
                    name="last_name"
                    value={userData.last_name}
                    onChange={e =>
                        setUserData({
                            ...userData,
                            last_name: e.target.value
                        })
                    }
                    required
                />
                <button type="submit">Register</button>

                {userData.response && <p className="message">Message: {userData.response}</p>}
            </form>
        </div>
    )
}
export default RegisterForm