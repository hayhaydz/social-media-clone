import React, { useState } from 'react';
import LoginForm from './LoginForm/LoginForm';
import RegisterForm from './RegisterForm/RegisterForm';

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <section className="auth">
            {isLogin ? <LoginForm /> : <RegisterForm />}

            <button onClick={()=>setIsLogin(!isLogin)}>{isLogin ? 'Create a new user' : 'Login to user'}</button>
        </section>
    )
}
export default Auth