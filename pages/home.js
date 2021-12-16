import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { withAuthSync } from '../utils/auth';
import webRoutes from '../utils/webRoutes';
import { Layout, App } from '../components';

const Home = ({ auth, currentUser }) => {
    const router = useRouter();
    if(!auth) {
        if (typeof window !== 'undefined') {
            router.push(webRoutes.login);
        }
    } else {
        return (
            <Layout auth={auth.token} >
                <App jwt={auth.token} currentUser={currentUser} />
            </Layout>
        )
    }

    return <div></div>
}
export default withAuthSync(Home);