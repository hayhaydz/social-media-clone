import Link from 'next/link';
import useSWR from 'swr';
import { getAuth } from '../../../utils/apiHandler';
import Post from '../Post';
import { ViewComments } from '../../';

const SinglePost = ({ jwt, currentUser, query_id }) => {
    const fetcher = (url, token) => getAuth(url, token).then((r) => r.json());
    const url = `${process.env.PRIVATE_API_URL}/api/post/id/${query_id}`;
    const { data: response = {}, isLoading, isError, mutate } = useSWR([url, jwt], fetcher);

    if(isLoading) return <div>Loading...</div>;
    if(isError) return <div>Fetching posts has failed</div>;

    return (
        <>
            {response.data &&
                <>
                    {response.status !== 'fail' &&
                        <>
                            <Post {...response.data} jwt={jwt} currentUsersID={currentUser.user_id} isSingle={true} mutate={mutate} />
                            <ViewComments jwt={jwt} currentUser={currentUser} query_id={query_id}/>
                        </>
                    }
                </>
            }
            {response.status === 'fail' &&
                <>
                    <h3>Could not find the post that you were looking for...</h3>
                    <Link href="/home"><a className="link">Return home</a></Link>
                </>
            }
        </>
    )
}
export default SinglePost;