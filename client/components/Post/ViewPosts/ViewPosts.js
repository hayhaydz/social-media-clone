import React, { useState, useEffect } from 'react';
import useSWR from 'swr';
import { getAuth } from '../../../utils/apiHandler';
import Post from './Post/Post';

const ViewPost = ({ jwt, isRender }) => {
    const fetcher = (url, token) => getAuth(url, token).then((r) => r.json());
    const { data: user = {}, isLoading, isError } = useSWR([`${process.env.PRIVATE_API_URL}/api/post`, jwt], fetcher);
    if(isLoading) return <div>Loading...</div>
    if(isError) return <div>Failed to find user...</div>;

    useEffect(() => {
        console.log(isRender);
    })

    return (
        <div>
            {user.posts &&
                user.posts.map((post, index) => {
                    return <Post {...post} key={index}/>
                })
            }
        </div>
    )

}
export default ViewPost;