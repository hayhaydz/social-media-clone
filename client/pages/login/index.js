import React from 'react'
import { Layout , LoginForm } from '../../components';

const LoginPage = () => {
    return (
        <Layout>
            <section className="LoginPage">
                <h1>This is the login page.</h1>
                <LoginForm />
            </section>
        </Layout>
    )
}
export default LoginPage