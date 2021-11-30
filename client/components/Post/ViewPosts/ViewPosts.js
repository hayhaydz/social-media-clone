import useSWR from 'swr';
import { getAuth } from '../../../utils/apiHandler';
import Post from './Post/Post';

const ViewPost = ({ jwt, user_id }) => {
    const fetcher = (url, token) => getAuth(url, token).then((r) => r.json());
    const { data: response = {}, isLoading, isError } = useSWR([`${process.env.PRIVATE_API_URL}/api/post`, jwt], fetcher);
    if(isLoading) return <div>Loading...</div>
    if(isError) return <div>Failed to find user...</div>;

    return (
        <div>
            {response.data &&
                response.data.map((post, index) => {
                    return <Post key={index} {...post} usersID={user_id} jwt={jwt}/>
                })
            }
        </div>
    )

}
export default ViewPost;