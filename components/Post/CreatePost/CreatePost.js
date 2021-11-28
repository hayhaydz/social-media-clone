import React, { useState } from 'react';
import { postAuth } from '../../../utils/apiHandler';
import { Error, Success } from '../../index';
import { XCircleIcon } from '@heroicons/react/outline';

const CreatePost = () => {

    return (
        <div className="p-4 card bg-base-200 w-1/4">
            <div className="flex w-full mb-4 justify-between align-center">
                <span>52/280</span>
                <label htmlFor="my-modal" className="btn btn-ghost btn-square"><XCircleIcon className="w-6 h-6 mx-2" /></label>
            </div>
            <textarea name="" id="" className="textarea resize-none h-48 w-full mb-4" placeholder="What's on your mind?"></textarea>
            <button className="btn btn-primary">post</button>
        </div>
    )
}
export default CreatePost;