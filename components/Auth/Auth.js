import React, { useState, useEffect } from 'react';
import LoginForm from './LoginForm/LoginForm';
import RegisterForm from './RegisterForm/RegisterForm';
import { Error, Success } from '../';

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [responseMsg, setResponseMsg] = useState({isError: false, text: ''});

    useEffect(() => {
        if(responseMsg.text !== '') {
            setTimeout(() => {
                setResponseMsg({
                    isError: false,
                    text: ''
                })
            }, 3000);
        }
    }, [responseMsg]);

    return (
        <section className="auth m-auto">
            {responseMsg.text !== '' &&
                <div className="mb-8">
                    {responseMsg.isError ? <Error text={responseMsg.text}/> : <Success text={responseMsg.text} />}
                </div>
            }

            {isLogin ? <LoginForm responseMsg={responseMsg} setResponseMsg={setResponseMsg} /> : <RegisterForm setIsLogin={setIsLogin} responseMsg={responseMsg} setResponseMsg={setResponseMsg} />}

            <button 
                className="btn btn-link" 
                onClick={()=>setIsLogin(!isLogin)}
            >
                {isLogin ? 'Create a new user' : 'Login to user'}
            </button>
        </section>
    )
}
export default Auth