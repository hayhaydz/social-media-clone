import useSWR from 'swr';
import { getAuth } from '../../utils/apiHandler';
import User from './User/User';

const SearchResult = ({ jwt, currentUsersID, query }) => {

    const url = `${process.env.PRIVATE_API_URL}/api/user/search?q=${query}`;
    const fetcher = (url, token) => getAuth(url, token).then((r) => r.json());
    const { data: response = {}, isLoading, isError } = useSWR([url, jwt], fetcher, {refreshInterval: 1000});
    console.log(response);

    if(isLoading) return <div>Loading...</div>
    if(isError) return <div>Fetching posts has failed</div>;

    return (
        <div className="searchResults grid grid-cols-1 md:grid-cols-3 gap-4">
            {response.data &&
                response.data.map((user, index) => {
                    return <a href={`/u/${user.username}`} className="!no-underline !font-normal" ><User {...user} key={index} currentUsersID={currentUsersID} /></a>
                })
            }
            {response.status == 'fail' &&
                <div>
                    <p>Could not find any users...</p>
                </div>
            }
        </div>
    )
}
export default SearchResult;