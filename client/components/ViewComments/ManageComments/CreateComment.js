import { useState, useRef } from 'react';
import Router from 'next/router';
import { postAuth } from '../../../utils/apiHandler';
import { Error } from '../../';

const CreateComment = ({ jwt, currentUsersID, post_id }) => {
    const [commentData, setCommentData] = useState({ text: '', error: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setCommentData({
            ...commentData,
            error: ''
        });
        if(commentData.text === '') {
            setCommentData({
                ...commentData,
                error: 'Please enter some text to post a comment!'
            });
            return;
        }

        const data = {
            comment: commentData.text
        };
        const response = await postAuth(data, `${process.env.PRIVATE_API_URL}/api/post/${post_id}/comment`, jwt);
        response.json().then(async (data) => {
            if(data.status === 'success') {
                setCommentData({
                    text: '',
                    error: ''
                });
                Router.push({
                    pathname: `/p/${post_id}`,
                    query: { msg: data.message }
                });
            } else {
                console.log('There was an error with creating your comment. Error message:', data.message);
                setCommentData({
                    ...commentData,
                    error: data.message
                })
            }
        });
    }

    return (
        <div className="card bg-neutral p-6 mb-8 w-full max-w-xl">
            <textarea type="text" name="text" id="text" className="textarea h-24 textarea-bordered resize-none w-full mr-8" placeholder="Let them know what you have to say..." value={commentData.text} onChange={(e) => setCommentData({...commentData, text: e.target.value})} maxLength={320}/>
            <button className="btn btn-primary mt-4" onClick={handleSubmit}>Add</button>
            {commentData.error && 
                <Error text={commentData.error}/>
            }
        </div>
    )
}
export default CreateComment;