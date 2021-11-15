import Router from 'next/router';
import useSWR from 'swr';
import { withAuthSync, logout } from '../utils/auth';
import { getAuth } from '../utils/apiHandler';
import { Layout } from '../components';

const App = ({ accessToken }) => {
    const fetcher = (url, token) => getAuth(url, token).then((r) => r.json());
    const { data: user = {}, isLoading, isError } = useSWR([`${process.env.PRIVATE_API_URL}/api/user`, accessToken.token], fetcher);
    if(isLoading) return <div>Loading...</div>
    if(isError) return <div>Failed to find user...</div>;
    return (
        <Layout>
            <section>
                <button onClick={logout}>Logout</button>
                <h1>This is the app page</h1>
                <span>Welcome</span>
                <p>{`${user.first_name} ${user.last_name}`}</p>
            </section>
        </Layout>
    )
}

export default withAuthSync(App)