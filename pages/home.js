import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { withAuthSync } from '../utils/auth';
import webRoutes from '../utils/webRoutes';
import { Layout, App } from '../components';

const Home = ({ auth }) => {
    const [isRender, setIsRender] = useState(false);

    const router = useRouter();
    if(!auth) {
        if (typeof window !== 'undefined') {
            router.push('/');
        }
    } else {
        return (
            <Layout auth={auth.token} isRender={isRender} setIsRender={setIsRender}>
                <App jwt={auth.token} isRender={isRender} />
            </Layout>
        )
    }

    return <div></div>
}
export default withAuthSync(Home);