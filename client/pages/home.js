import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { withAuthSync } from '../utils/auth';
import webRoutes from '../utils/webRoutes';
import { Layout, App } from '../components';

const Home = ({ auth, currentUser }) => {
    const [message, setMessage] = useState('');

    const router = useRouter();
    if(!auth) {
        if (typeof window !== 'undefined') {
            router.push(webRoutes.login);
        }
    } else {
        return (
            <Layout auth={auth.token} setMessage={setMessage} >
                <App jwt={auth.token} currentUser={currentUser} message={message} setMessage={setMessage} />
            </Layout>
        )
    }

    return <div></div>
}
export default withAuthSync(Home);