import React, { useState, useEffect } from 'react';
import useSWR from 'swr';
import { getAuth } from '../../../utils/apiHandler';
import { Error, Success } from '../../';
import Post from './Post/Post';

const ViewPost = ({ jwt, user_id, message, setMessage }) => {

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
        <div>
            {message !== '' &&
                <div className="mb-8">
                    <Success text={message} />
                </div>
            }
            {response.data &&
                response.data.map((post, index) => {
                    return <Post key={index} {...post} usersID={user_id} jwt={jwt} setMessage={setMessage}/>
                })
            }
        </div>
    )

}
export default ViewPost;