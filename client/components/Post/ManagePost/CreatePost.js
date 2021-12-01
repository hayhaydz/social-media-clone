import React, { useState } from 'react';
import { postAuth } from '../../../utils/apiHandler';
import { ManagePost } from '../../';

const CreatePost = ({ jwt, setMessage }) => {
    const [postData, setPostData] = useState({ text: '', charCount: 0, error: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setPostData({
            ...postData,
            error: ''
        });

        const { text } = postData;

        const response = await postAuth({text}, `${process.env.PRIVATE_API_URL}/api/post/new`, jwt);
        response.json().then(async (data) => {
            console.log(data);
            if(data.status === 'success') {
                setMessage(data.message);
                document.getElementById('createModalClose').click();
            } else {
                console.log('There was an error with creating your post. Error message:', data.message);
                setPostData({
                    ...postData,
                    error: data.message
                })
            }
        });
    }

    return (
        <ManagePost postData={postData} setPostData={setPostData} handleSubmit={handleSubmit} />
    )
}
export default CreatePost;