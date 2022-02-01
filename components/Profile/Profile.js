import Link from 'next/link';
import Router from 'next/router';
import useSWR from 'swr';
import { getAuth } from '../../utils/apiHandler';
import ViewPosts from '../Post/ViewPosts/ViewPosts';

const Profile = ({ jwt, currentUser, query_id, PUBLIC_URL }) => {
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
                            <div className="flex flex-col md:flex-row justify-between md:items-center mb-8">                       
                                <div>
                                    <h1 className="!text-5xl font-bold !mt-8 uppercase">{`${response.data.first_name} ${response.data.last_name}`}</h1>
                                    {response.data.description &&
                                        <p className="max-w-lg">{response.data.description}</p>
                                    }
                                </div>
                                
                                {response.data.user_id == currentUser.user_id &&
                                    <button className="btn btn-primary" onClick={() => Router.push('/settings')}>Edit Profile</button>
                                }
                            </div>
                            <ViewPosts jwt={jwt} currentUser={currentUser} BASE_URL={`${process.env.PRIVATE_API_URL}/api/post/u/${response.data.username}`} PUBLIC_URL={`${process.env.NEXT_PUBLIC_API_URL}`} />
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