import React, { useState } from 'react';
import { patchAuth } from '../../../utils/apiHandler';
import { ManagePost } from '../../';

const EditPost = ({ jwt, post_id, text, setIsEditing, setMessage }) => {
    const [postData, setPostData] = useState({ text: text, charCount: text.length, error: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setPostData({
            ...postData,
            error: ''
        });

        const { text } = postData;

        const response = await patchAuth({text: text}, `${process.env.PRIVATE_API_URL}/api/post/${post_id}`, jwt);
        response.json().then(async (data) => {
            if(data.status === 'success') {
                setMessage(data.message);
                document.getElementById('editModalClose').click();
            } else {
                console.log('There was an error with updating your post. Error message:', data.message);
                setPostData({
                    ...postData,
                    error: data.message
                })
            }
        });
    }

    return (
        <ManagePost postData={postData} isEdit={true} setPostData={setPostData} handleSubmit={handleSubmit} setIsEditing={setIsEditing} />
    )
}
export default EditPost;