import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { withAuthSync } from '../../utils/auth';
import webRoutes from '../../utils/webRoutes';
import { Layout, Profile } from '../../components';

const User = ({ auth, currentUser }) => {
    const [message, setMessage] = useState('');
    const router = useRouter();
    const { pid } = router.query;

    if(!auth) {
        if (typeof window !== 'undefined') {
            router.push(webRoutes.login);
        }
    } else {
        return (
            <Layout auth={auth.token} currentUser={currentUser}>
                <Profile jwt={auth.token} currentUsersID={currentUser.user_id} query_id={pid} message={message} setMessage={setMessage} />
            </Layout>
        )
    }

    return <div></div>
}
export default withAuthSync(User);