import { useState, useRef } from 'react';
import { postFormDataAuth } from '../../../utils/apiHandler';
import { ManagePost } from '../../';

const EditPost = ({ jwt, post_id, text, setIsEditing, mutate, setFeedbackMsg }) => {
    const [postData, setPostData] = useState({ text: text, imageName: '', charCount: text.length, error: '' });
    const form = useRef(null);
    // NEED TO ADDRESS AN ABILITY TO EDIT IMAGES ON POSTS. NEED TO FEED IMAGE DATA THROUGH TO INPUT...

    const handleSubmit = async (e) => {
        e.preventDefault();
        setPostData({
            ...postData,
            error: ''
        });

        const data = new FormData(form.current);
        const response = await postFormDataAuth(data, `${process.env.PRIVATE_API_URL}/api/post/id/${post_id}`, jwt);
        response.json().then(async (data) => {
            if(data.status === 'success') {
                setIsEditing(false);
                setPostData({
                    text: '',
                    imageName: '',
                    charCount: 0,
                    error: ''
                });
                setFeedbackMsg({
                    isError: false,
                    text: 'Post was edited successfully'
                })
                mutate();
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
        <ManagePost form={form} postData={postData} isEdit={true} setPostData={setPostData} handleSubmit={handleSubmit} setIsEditing={setIsEditing} />
    )
}
export default EditPost;