import { useRouter } from 'next/router';
import { withAuthSync } from '../utils/auth';
import webRoutes from '../utils/webRoutes';
import { Layout, App } from '../components';

const Home = ({ auth }) => {
    const router = useRouter();
    if(!auth) {
        if (typeof window !== 'undefined') {
            router.push('/');
        }
    } else {
        return (
            <Layout auth={auth}>
                <p>This is the home page</p>
                <App jwt={auth.token}/>
            </Layout>
        )
    }

    return <div></div>
}
export default withAuthSync(Home);