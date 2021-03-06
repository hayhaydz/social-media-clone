import useSWR from 'swr';
import { getAuth } from '../../utils/apiHandler';
import CreateComment from './ManageComments/CreateComment';
import Comment from './Comment/Comment';

const ViewComments = ({ jwt, currentUser, query_id }) => {
    const fetcher = (url, token) => getAuth(url, token).then((r) => r.json());
    const url = `${process.env.PRIVATE_API_URL}/api/post/${query_id}/comments`;
    const { data: response = {}, isLoading, isError, mutate } = useSWR([url, jwt], fetcher);

    if(isLoading) return <div>Loading...</div>;
    if(isError) return <div>Fetching comments has failed</div>;

    return (
        <div className="comments flex flex-col items-center">
            <CreateComment jwt={jwt} currentUsersID={currentUser.user_id} post_id={query_id} mutate={mutate}/>
            {response.data &&
                response.data.map((comment, index) => {
                    return <Comment key={index} {...comment} jwt={jwt} currentUsersID={currentUser.user_id} mutate={mutate}/>
                })
            }
        </div>
    )
}
export default ViewComments;