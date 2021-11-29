import React, { useState } from 'react';
import { postAuth } from '../../../utils/apiHandler';
import { Error, Success } from '../../index';
import { XCircleIcon } from '@heroicons/react/outline';

const CreatePost = ({ jwt, isRender, setIsRender }) => {
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
                console.log('success');
                document.getElementById('modalClose').click();
                setIsRender(!isRender);
            } else {
                console.log('There was an error with logging the user in. Error message:', data.message);
                setPostData({
                    ...postData,
                    error: data.message
                })
            }
        });
    }

    const handleOnChange = async (e) => {
        setPostData({
            ...postData,
            text: e.target.value,
            charCount: e.target.value.length
        })
    }

    return (
        <div className="p-4 card bg-base-200 w-1/4">
            <div className="flex w-full mb-4 justify-between items-center">
                <span className={(postData.charCount > 480 ? 'text-red-500' : 'text-gray-300') + ' font-bold flex items-center'}>{postData.charCount}/480</span>
                <label htmlFor="my-modal" className="btn btn-ghost btn-square" id="modalClose"><XCircleIcon className="w-6 h-6 mx-2 text-gray-300" /></label>
            </div>
            <form action="#" id="form" className="form-control" name="form" onSubmit={handleSubmit}>
                <textarea 
                    name="text"
                    id="text"
                    value={postData.text}
                    onChange={handleOnChange}
                    className="textarea resize-none h-48 w-full mb-4" 
                    placeholder="What's on your mind?"
                    required
                />
                <button type="submit" className="btn btn-primary">post</button>
                {postData.error && 
                    <Error text={postData.error}/>
                }
            </form>
        </div>
    )
}
export default CreatePost;