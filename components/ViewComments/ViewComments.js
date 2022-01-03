import Link from 'next/link';
import useSWR from 'swr';
import { getAuth } from '../../utils/apiHandler';
import Comment from './Comment/Comment';

const ViewComments = ({ jwt, currentUser, query_id }) => {
    const fetcher = (url, token) => getAuth(url, token).then((r) => r.json());
    const url = `${process.env.PRIVATE_API_URL}/api/post/${query_id}/comments`;
    const { data: response = {}, isLoading, isError } = useSWR([url, jwt], fetcher);
    console.log(response);

    if(isLoading) return <div>Loading...</div>;
    if(isError) return <div>Fetching comments has failed</div>;

    return (
        <div>
            {response.data &&
                <>
                    {response.status !== 'fail' &&
                        <>
                            <p>found some cool comments</p>
                            <Comment {...response.data} jwt={jwt} currentUsersID={currentUser.user_id} />
                        </>
                    }
                </>
            }
        </div>
    )
}
export default ViewComments;