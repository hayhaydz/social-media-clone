import { useRouter } from 'next/router';
import { withAuthSync } from '../utils/auth';
import webRoutes from '../utils/webRoutes';
import { Layout, Settings } from '../components';

const SettingsPage = ({ auth, currentUser }) => {
    const router = useRouter();

    if(!auth) {
        if (typeof window !== 'undefined') {
            router.push(webRoutes.login);
        }
    } else {
        return (
            <Layout auth={auth.token} currentUser={currentUser}>
                <Settings jwt={auth.token} currentUser={currentUser} />
            </Layout>
        )
    }

    return <div></div>
}
export default withAuthSync(SettingsPage);