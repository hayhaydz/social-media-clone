import useSWR from 'swr';
import { getAuth } from '../../utils/apiHandler';
import { ViewPosts } from '../';

const App = ({ jwt, isRender }) => {
    const fetcher = (url, token) => getAuth(url, token).then((r) => r.json());
    const { data: user = {}, isLoading, isError } = useSWR([`${process.env.PRIVATE_API_URL}/api/user`, jwt], fetcher);
    if(isLoading) return <div>Loading...</div>
    if(isError) return <div>Failed to find user...</div>;

    return (
        <section className="app">
            <span className="block mb-4">Welcome</span>
            <h1>{`${user.first_name} ${user.last_name}`}</h1>
            <ViewPosts jwt={jwt} isRender={isRender}/>
        </section>
    )
}
export default App