import Link from 'next/link';
import useSWR from 'swr';
import { getAuth } from '../../utils/apiHandler';
import ViewPosts from '../Post/ViewPosts/ViewPosts';

const Profile = ({ jwt, currentUsersID, query_id, message, setMessage }) => {
    const fetcher = (url, token) => getAuth(url, token).then((r) => r.json());
    const url = `${process.env.PRIVATE_API_URL}/api/user/u/${query_id}`;
    const { data: response = {}, isLoading, isError } = useSWR([url, jwt], fetcher);

    if(isLoading) return <div>Loading...</div>
    if(isError) return <div>Fetching posts has failed</div>;

    return (
        <div>
            {response.data &&
                <>
                    {response.status !== 'fail' &&
                        <>
                            <div className="flex justify-between items-center mb-8">
                                <div>
                                <h2 className="!text-5xl font-bold !mt-8">{`${response.data.first_name} ${response.data.last_name}`}</h2>
                                {response.data.description &&
                                    <p className="max-w-lg">{response.data.description}</p>
                                }
                                </div>
                                
                                {response.data.user_id == currentUsersID &&
                                    <button className="btn btn-primary">Edit Profile</button>
                                }
                            </div>
                            <ViewPosts jwt={jwt} currentUsersID={currentUsersID} message={message} setMessage={setMessage} BASE_URL={`${process.env.PRIVATE_API_URL}/api/post/u/${response.data.username}`} />
                        </>
                    }
                </>
            }
            {response.status === 'fail' &&
                <>
                    <h3>Could not find the user that you were looking for...</h3>
                    <Link href="/home"><a className="link">Return home</a></Link>
                </>
            }
        </div>
    )
}
export default Profile;