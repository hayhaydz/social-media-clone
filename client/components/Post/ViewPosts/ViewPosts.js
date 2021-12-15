import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { getAuth } from '../../../utils/apiHandler';
import { Error, Success } from '../../';
import Post from '../Post';

const ViewPost = ({ jwt, currentUsersID, message, setMessage, url}) => {
    const router = useRouter();

    const handleClick = (e, path) => {
        router.push(path);
    }

    useEffect(() => {
        if(message !== '') {
            setTimeout(() => {
                setMessage('');
            }, 5000);
        }
    }, [message]);

    const fetcher = (url, token) => getAuth(url, token).then((r) => r.json());
    const { data: response = {}, isLoading, isError } = useSWR([url, jwt], fetcher, {refreshInterval: 1000});

    if(isLoading) return <div>Loading...</div>
    if(isError) return <div>Fetching posts has failed</div>;

    return (
        <div className="posts flex flex-col items-center">
            {message !== '' &&
                <div className="mb-8 max-w-xl w-full">
                    <Success text={message} />
                </div>
            }
            {response.data &&
                response.data.map((post, index) => {
                    return <a className="!no-underline !font-normal inline-block mb-16 max-w-xl w-full cursor-pointer" key={index} onClick={(e) => handleClick(e, `/p/${post.post_id}`)} ><Post {...post} currentUsersID={currentUsersID} jwt={jwt} setMessage={setMessage} isSingle={false}/></a>
                })
            }
        </div>
    )

}
export default ViewPost;