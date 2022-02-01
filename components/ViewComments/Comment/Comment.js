import React, { useState } from 'react';
import { DotsVerticalIcon } from '@heroicons/react/outline';
import { Modal } from '../../';
import DeleteComment from '../ManageComments/DeleteComment';

const Comment = ({ comment_id, post_id, user_id, first_name, last_name, username, text, committed_at, currentUsersID, jwt, mutate }) => {
    const [isDeleting, setIsDeleting] = useState(false);

    let date = new Date(committed_at).toLocaleDateString('en-us', { year:"numeric", month:"short", day:"numeric"});

    const handleDelClick = (e) => {
        e.stopPropagation();
        setIsDeleting(!isDeleting);
    }

    return (
        <div className="card bg-neutral p-4 md:p-6 mb-8 overflow-visible w-full max-w-xl !inline-block">
            <div className="flex items-center">
                <h3 className="!m-0 !mr-2 md:!mr-4">{first_name} {last_name}</h3>
                <span className="!no-underline !text-gray-400 cursor-pointer hover:!underline">@{username}</span>
                <span className="mx-2 md:mx-4 text-gray-400 font-bold"> · </span>
                <span className="text-gray-400">{date}</span>
                {user_id === currentUsersID &&
                    <div className="dropdown dropdown-end ml-auto">
                        <button tabIndex="0" className="btn btn-ghost btn-square" onClick={(e) => e.stopPropagation()}><DotsVerticalIcon className="w-6 h-6 mx-2" /></button>
                        <ul tabIndex="0" className="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-36 mt-8 overflow-visible">
                            <li className="before:hidden !pl-0">
                                <a className="btn btn-ghost btn-sm normal-case !text-red-600 modal-button !no-underline !p-0" onClick={handleDelClick}>Delete Comment</a>
                            </li>
                        </ul>
                    </div>
                }
            </div>
            <p className="break-words">{text}</p>

            {isDeleting &&
                <Modal id="deleteModal" ><DeleteComment jwt={jwt} comment_id={comment_id} post_id={post_id} isDeleting={isDeleting} setIsDeleting={setIsDeleting} mutate={mutate} /></Modal>
            }
        </div>
    )
}
export default Comment