import React, { useState } from 'react';
import Router from 'next/router';
import { postAuth } from '../../../utils/apiHandler';
import { Error } from '../../';


const DeleteAccount = ({ jwt, post_id, isDeleting, setIsDeleting }) => {
    const [deleteData, setDeleteData] = useState({password: '', error: '' });

    const handleConfirmClick = async () => {
        setDeleteData({
            ...deleteData,
            error: ''
        });

        const response = await postAuth({password: deleteData.password}, `${process.env.PRIVATE_API_URL}/api/user/delete`, jwt);
        response.json().then(async (data) => {
            if(data.status === 'success') {
                setIsDeleting(!isDeleting);
                Router.push({
                    pathname: '/home',
                    query: { msg: data.message }
                });
            } else {
                console.log('There was an error with deleting your account. Error message:', data.message);
                setDeleteData({
                    ...deleteData,
                    error: data.message
                })
            }
        });
    }

    return (
        <div className="p-4 card bg-base-200 w-full h-full rounded-none md:rounded-lg md:h-auto md:w-1/4">
            <h1 className="!mb-16">Are you sure you want to delete your account?</h1>
            <div className="mb-8 max-w-sm">
                <label htmlFor="password">Confirm Password</label>
                <input 
                    type="password" 
                    id="password"
                    className="input input-bordered block w-full"
                    name="password"
                    value={deleteData.password}
                    onChange={(e) => (
                        setDeleteData({
                            ...deleteData,
                            password: e.target.value
                        })
                    )}
                    required
                />
            </div>
            <div className="inline-flex gap-x-4">
                <button className="btn btn-primary flex-grow" onClick={handleConfirmClick}>Delete Account</button>
                <button className="btn flex-grow" id="deleteModalClose" onClick={() => setIsDeleting(!isDeleting)}>Cancel</button>
            </div>
            {deleteData.error && 
                <Error text={deleteData.error}/>
            }
        </div>
    )
}
export default DeleteAccount;