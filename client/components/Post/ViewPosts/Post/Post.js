import { useState } from 'react';
import { DotsVerticalIcon } from "@heroicons/react/outline";
import { Modal, EditPost, DeletePost } from '../../../';

const Post = ({ post_id, user_id, usersID, first_name, last_name, username, text, date_published, jwt, setMessage }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    let date = new Date(date_published).toLocaleDateString('en-us', { year:"numeric", month:"short", day:"numeric"});

    return (
        <div className="card bg-neutral p-6 mb-16 max-w-xl m-auto overflow-visible">
            <div className="flex items-center">
                <h3 className="!m-0 !mr-4">{first_name} {last_name}</h3>
                <span className="text-gray-400">@{username}</span>
                <span className="mx-4 text-gray-400 font-bold"> · </span>
                <span className="text-gray-400 mr-auto">{date}</span>
                {user_id === usersID &&
                    <div className="dropdown dropdown-end">
                        <button tabIndex="0" className="btn btn-ghost btn-square"><DotsVerticalIcon className="w-6 h-6 mx-2" /></button>
                        <ul tabIndex="0" className="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-36 mt-8 overflow-visible">
                            <li className="before:hidden !pl-0">
                                <label htmlFor="editModal" className="btn btn-ghost btn-sm normal-case modal-button" onClick={() => setIsEditing(!isEditing)}>Edit Post</label>
                            </li>
                            <li className="before:hidden !pl-0">
                                <label htmlFor="deleteModal" className="btn btn-ghost btn-sm normal-case text-red-600 modal-button" onClick={() => setIsDeleting(!isDeleting)}>Delete Post</label>
                            </li>
                        </ul>
                    </div>
                }
            </div>

            <p className="break-words">{text}</p>
            {isEditing &&
                <Modal id="editModal" ><EditPost jwt={jwt} post_id={post_id} text={text} setIsEditing={setIsEditing} setMessage={setMessage} /></Modal>
            }
            {isDeleting &&
                <Modal id="deleteModal" ><DeletePost jwt={jwt} post_id={post_id} isDeleting={isDeleting} setIsDeleting={setIsDeleting} setMessage={setMessage} /></Modal>
            }
        </div>
    )
}
export default Post;