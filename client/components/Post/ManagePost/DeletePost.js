import React, { useState } from 'react';
import Router from 'next/router';
import { deleteAuth } from '../../../utils/apiHandler';
import { ManagePost, Error } from '../../';


const DeletePost = ({ jwt, post_id, isDeleting, setIsDeleting }) => {
    const [deleteData, setDeleteData] = useState({error: '' });

    const handleConfirmClick = async () => {
        setDeleteData({
            ...deleteData,
            error: ''
        });

        const response = await deleteAuth(`${process.env.PRIVATE_API_URL}/api/post/id/${post_id}`, jwt);
        response.json().then(async (data) => {
            if(data.status === 'success') {
                setIsDeleting(!isDeleting);
                Router.push({
                    pathname: '/home',
                    query: { msg: data.message }
                });
            } else {
                console.log('There was an error with updating your post. Error message:', data.message);
                setDeleteData({
                    ...deleteData,
                    error: data.message
                })
            }
        });
    }

    return (
        <div className="p-4 card bg-base-200 w-1/4">
            <h1 className="!mb-16">Are you sure you want to delete this post?</h1>
            <div className="inline-flex gap-x-4">
                <button className="btn btn-primary flex-grow" onClick={handleConfirmClick}>Confirm</button>
                <button className="btn flex-grow" id="deleteModalClose" onClick={() => setIsDeleting(!isDeleting)}>Cancel</button>
            </div>
            {deleteData.error && 
                <Error text={deleteData.error}/>
            }
        </div>
    )
}
export default DeletePost;