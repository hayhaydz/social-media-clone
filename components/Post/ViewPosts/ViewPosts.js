import useSWR from 'swr';
import { getAuth } from '../../../utils/apiHandler';
import Post from '../Post';

const ViewPost = ({ jwt, currentUsersID, url}) => {
    const fetcher = (url, token) => getAuth(url, token).then((r) => r.json());
    const { data: response = {}, isLoading, isError } = useSWR([url, jwt], fetcher, {refreshInterval: 1000});

    if(isLoading) return <div>Loading...</div>
    if(isError) return <div>Fetching posts has failed</div>;

    return (
        <div className="posts flex flex-col items-center">
            {response.data &&
                response.data.map((post, index) => {
                    return <Post key={index} {...post} currentUsersID={currentUsersID} jwt={jwt} isSingle={false}/>
                })
            }
        </div>
    )

}
export default ViewPost;