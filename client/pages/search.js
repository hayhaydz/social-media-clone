import { useRouter } from 'next/router';
import { withAuthSync } from '../utils/auth';
import webRoutes from '../utils/webRoutes';
import { Layout, SearchResult } from '../components';

const Search = ({ auth, currentUser }) => {
    const router = useRouter();

    if(!auth) {
        if (typeof window !== 'undefined') {
            router.push(webRoutes.login);
        }
    } else {
        return (
            <Layout auth={auth.token}>
                <h1>Searching for "{router.query.q}"</h1>
                <SearchResult jwt={auth.token} currentUsersID={currentUser.user_id} query={router.query.q} />
            </Layout>
        )
    }
}
export default withAuthSync(Search);