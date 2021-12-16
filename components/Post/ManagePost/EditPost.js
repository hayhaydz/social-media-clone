import React, { useState } from 'react';
import { patchAuth } from '../../../utils/apiHandler';
import { ManagePost } from '../../';

const EditPost = ({ jwt, post_id, text, setIsEditing }) => {
    const [postData, setPostData] = useState({ text: text, charCount: text.length, error: '' });
    // NEED TO ADDRESS AN ABILITY TO EDIT IMAGES ON POSTS. NEED TO FEED IMAGE DATA THROUGH TO INPUT...

    const handleSubmit = async (e) => {
        e.preventDefault();
        setPostData({
            ...postData,
            error: ''
        });

        const { text } = postData;

        const response = await patchAuth({text: text}, `${process.env.PRIVATE_API_URL}/api/post/id/${post_id}`, jwt);
        response.json().then(async (data) => {
            if(data.status === 'success') {
                setIsEditing(false);
                Router.push({
                    pathname: '/home',
                    query: { msg: data.message }
                });
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