import React, { useState } from 'react';
import { post } from '../../../utils/apiHandler';

const RegisterForm = ({ setIsLogin, responseMsg, setResponseMsg }) => {
    const [userData, setUserData] = useState({ username: '', email: '', password: '', first_name: '', last_name: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setResponseMsg({
            isError: false,
            text: ''
        });

        const { username, email, password, first_name, last_name } = userData;

        const response = await post({username, email, password, first_name, last_name}, `${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`);
        response.json().then(async (data) => {
            let errrorStatus = false;
            if(data.status == 'success') {
                setIsLogin(true);
            } else {
                errrorStatus = true
            }
            
            setResponseMsg({
                isError: errrorStatus,
                text: data.message
            });
        });
    }

    return (
        <div className="p-10 card bg-base-200 max-w-md">
            <h3>Register below</h3>
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
                <label htmlFor="email" className="label">Email</label>
                <input 
                    type="email" 
                    id="email"
                    className="input mb-4"
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
                <label htmlFor="first_name" className="label">First Name</label>
                <input 
                    type="text" 
                    id="first_name"
                    className="input mb-4"
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
                <label htmlFor="last_name" className="label">Last Name</label>
                <input 
                    type="text" 
                    id="last_name"
                    className="input mb-8"
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
                <button type="submit" className="btn btn-primary">Register</button>
            </form>
        </div>
    )
}
export default RegisterForm