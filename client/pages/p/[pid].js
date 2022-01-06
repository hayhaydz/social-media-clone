import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useRouterScroll } from '@moxy/next-router-scroll';
import { withAuthSync } from '../../utils/auth';
import webRoutes from '../../utils/webRoutes';
import { Layout, SinglePost, ViewComments } from '../../components';


const Post = ({ auth, currentUser }) => {
    const router = useRouter();
    const { pid } = router.query;
    const { updateScroll } = useRouterScroll();

    useEffect(() => {
        updateScroll();
    }, []);

    if(!auth) {
        if (typeof window !== 'undefined') {
            router.push(webRoutes.login);
        }
    } else {
        return (
            <Layout auth={auth.token}>
                <SinglePost jwt={auth.token} currentUser={currentUser} query_id={pid} />
                <ViewComments jwt={auth.token} currentUser={currentUser} query_id={pid}/>
            </Layout>
        )
    }

    return <div></div>
}
export default withAuthSync(Post);