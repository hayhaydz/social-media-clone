import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import useSWR from 'swr';
import { getAuth } from '../../../utils/apiHandler';
import { Error, Success } from '../../';
import Post from '../Post';

const ViewPost = ({ jwt, currentUsersID, message, setMessage }) => {

    useEffect(() => {
        if(message !== '') {
            setTimeout(() => {
                setMessage('');
            }, 5000);
        }
    }, [message]);

    const fetcher = (url, token) => getAuth(url, token).then((r) => r.json());
    const url = `${process.env.PRIVATE_API_URL}/api/post`;
    const { data: response = {}, isLoading, isError } = useSWR([url, jwt], fetcher, {refreshInterval: 1000});

    if(isLoading) return <div>Loading...</div>
    if(isError) return <div>Fetching posts has failed</div>;

    return (
        <div className="posts flex flex-col items-center">
            {message !== '' &&
                <div className="mb-8">
                    <Success text={message} />
                </div>
            }
            {response.data &&
                response.data.map((post, index) => {
                    return <Link href={`/post/${post.post_id}`} key={index}><a className="!no-underline !font-normal inline-block mb-16 max-w-xl w-full"><Post {...post} currentUsersID={currentUsersID} jwt={jwt} setMessage={setMessage} isSingle={false}/></a></Link>
                })
            }
        </div>
    )

}
export default ViewPost;