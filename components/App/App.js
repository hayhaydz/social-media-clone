import useSWR from 'swr';
import { getAuth } from '../../utils/apiHandler';
import { ViewPosts } from '../';

const App = ({ jwt, message, setMessage }) => {
    const fetcher = (url, token) => getAuth(url, token).then((r) => r.json());
    const { data: response = {}, isLoading, isError } = useSWR([`${process.env.PRIVATE_API_URL}/api/user`, jwt], fetcher);
    if(isLoading) return <div>Loading...</div>
    if(isError) return <div>Failed to find user...</div>;

    return (
        <section className="app">
            <span className="block mb-4">Welcome</span>
            {response.data && <>
                <h1>{`${response.data.first_name} ${response.data.last_name}`}</h1>
                <ViewPosts jwt={jwt} {...response.data} message={message} setMessage={setMessage} />
                </>
            }
        </section>
    )
}
export default App