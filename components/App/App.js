import useSWR from 'swr';
import { logout } from '../../utils/auth';
import { getAuth } from '../../utils/apiHandler';

const App = ({ jwt }) => {
    const fetcher = (url, token) => getAuth(url, token).then((r) => r.json());
    const { data: user = {}, isLoading, isError } = useSWR([`${process.env.PRIVATE_API_URL}/api/user`, jwt], fetcher);
    if(isLoading) return <div>Loading...</div>
    if(isError) return <div>Failed to find user...</div>;

    return (
        <section className="app">
            <button className="btn btn-primary" onClick={logout}>Logout</button>
            <h1>This is the app page</h1>
            <span>Welcome</span>
            <p>{`${user.first_name} ${user.last_name}`}</p>
        </section>
    )
}
export default App