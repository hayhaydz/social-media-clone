import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { withAuthSync } from '../../utils/auth';
import webRoutes from '../../utils/webRoutes';
import { Layout, Profile } from '../../components';

const User = ({ auth, currentUser }) => {
    const router = useRouter();
    const { pid } = router.query;

    if(!auth) {
        if (typeof window !== 'undefined') {
            router.push(webRoutes.login);
        }
    } else {
        return (
            <Layout auth={auth.token} currentUser={currentUser}>
                <Profile jwt={auth.token} currentUser={currentUser} query_id={pid} PUBLIC_URL={`${process.env.NEXT_PUBLIC_API_URL}`}/>
            </Layout>
        )
    }

    return <div></div>
}
export default withAuthSync(User);