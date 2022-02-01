import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import useSWR from 'swr';
import { getAuth } from '../../../utils/apiHandler';
import Post from '../Post';
import { ViewComments, Error, Success } from '../../';

const SinglePost = ({ jwt, currentUser, query_id, PUBLIC_URL }) => {
    const [feedbackMsg, setFeedbackMsg] = useState({isError: '', text: ''});

    useEffect(() => {
        if(feedbackMsg.text !== '') {
            setTimeout(() => {
                setFeedbackMsg({
                    ...feedbackMsg,
                    text: ''
                });
            }, 3000);
        }
    }, [feedbackMsg]);

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
                            <div>
                                {feedbackMsg.text !== '' &&
                                    <>
                                        {feedbackMsg.isError ?
                                            <Error text={feedbackMsg.text} />
                                            : <Success text={feedbackMsg.text} />
                                        }
                                    </>
                                }
                            </div>
                            <Post {...response.data} jwt={jwt} currentUsersID={currentUser.user_id} isSingle={true} mutate={mutate} PUBLIC_URL={PUBLIC_URL} setFeedbackMsg={setFeedbackMsg} />
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