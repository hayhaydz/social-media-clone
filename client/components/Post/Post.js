import { useState } from 'react';
import { useRouter } from 'next/router';
import { getAuth } from '../../utils/apiHandler';
import { DotsVerticalIcon, HeartIcon, AnnotationIcon, ShareIcon } from '@heroicons/react/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/solid';
import { Modal, EditPost, DeletePost } from '../';

const Post = ({ post_id, user_id, first_name, last_name, username, text, date_published, filename, total_likes, is_liked_by_user, currentUsersID, jwt, isSingle}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isLiked, setIsLiked] = useState(is_liked_by_user);
    const [totalLikes, setTotalLikes] = useState(total_likes);

    const router = useRouter();
    let date = new Date(date_published).toLocaleDateString('en-us', { year:"numeric", month:"short", day:"numeric"});

    const handlePostClick = () => {
        if(!isSingle) {
            router.push(`/p/${post_id}`);
        }
    }

    const handleEditClick = (e) => {
        e.stopPropagation();
        setIsEditing(!isEditing);
    }

    const handleDelClick = (e) => {
        e.stopPropagation();
        setIsDeleting(!isDeleting);
    }

    const handleHeartClick = async (e) => {
        e.stopPropagation();

        const response = await getAuth(`${process.env.PRIVATE_API_URL}/api/post/${post_id}/like`, jwt);
        response.json().then(async (result) => {
            if(result.status === 'success') {
                setIsLiked(!isLiked);
                setTotalLikes(result.data.total_likes);
            } else {
                console.log('There was an error with creating your post. Error message:', result.message);
            }
        });
    }

    const handleCommentClick = (e) => {
        e.stopPropagation();
    }

    const handleShareClick = (e) => {
        e.stopPropagation();
    }

    const handleUsernameClick = (e) => {
        e.stopPropagation();

        if(router.asPath != `/u/${username}`) {
            router.push(`/u/${username}`);
        }
    }

    return (
        <article className={'card bg-neutral p-6 overflow-visible w-full max-w-xl ' + (isSingle ? 'w-full m-auto mb-8' : '!inline-block  transition-colors hover:bg-neutral-focus mb-16 max-w-xl w-full cursor-pointer')} onClick={handlePostClick}>
            <div className="flex items-center">
                <h3 className="!m-0 !mr-4">{first_name} {last_name}</h3>
                <span onClick={handleUsernameClick} className="!no-underline !text-gray-400 cursor-pointer hover:!underline">@{username}</span>
                <span className="mx-4 text-gray-400 font-bold"> · </span>
                <span className="text-gray-400 mr-auto">{date}</span>
                {user_id === currentUsersID &&
                    <div className="dropdown dropdown-end">
                        <button tabIndex="0" className="btn btn-ghost btn-square" onClick={(e) => e.stopPropagation()}><DotsVerticalIcon className="w-6 h-6 mx-2" /></button>
                        <ul tabIndex="0" className="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-36 mt-8 overflow-visible">
                            <li className="before:hidden !pl-0">
                                <a className="btn btn-ghost btn-sm flex items-center normal-case modal-button !no-underline !p-0" onClick={handleEditClick}>Edit Post</a>
                            </li>
                            <li className="before:hidden !pl-0">
                                <a className="btn btn-ghost btn-sm normal-case !text-red-600 modal-button !no-underline !p-0" onClick={handleDelClick}>Delete Post</a>
                            </li>
                        </ul>
                    </div>
                }
            </div>
            <p className="break-words">{text}</p>
            {filename &&
                <div className={'bg-base-100 rounded-2xl mb-4 ' + (!isSingle ? 'max-h-80 h-full flex items-center overflow-hidden' : '')}>
                    <img src={`${process.env.PRIVATE_API_URL}/uploads/images/posts/${filename}`}/>
                </div>
            }

            <div className="flex items-center">
                <div className="mr-4 items-center justify-center">
                    <button className="btn btn-ghost btn-square" onClick={handleHeartClick}>
                        {!isLiked ? 
                            <HeartIcon className="w-6 h-6 mx-2" />
                            : <HeartIconSolid className="w-6 h-6 mx-2 text-secondary" />
                        }
                    </button>
                    {totalLikes > 0 &&
                        <span className="font-bold">{totalLikes}</span>
                    }
                </div>
                <button className="btn btn-ghost btn-square mr-4" onClick={handleCommentClick}><AnnotationIcon className="w-6 h-6 mx-2" /></button>
                <button className="btn btn-ghost btn-square" onClick={handleShareClick}><ShareIcon className="w-6 h-6 mx-2" /></button>
            </div>

            {isEditing &&
                <Modal id="editModal" ><EditPost jwt={jwt} post_id={post_id} text={text} setIsEditing={setIsEditing} /></Modal>
            }
            {isDeleting &&
                <Modal id="deleteModal" ><DeletePost jwt={jwt} post_id={post_id} isDeleting={isDeleting} setIsDeleting={setIsDeleting} /></Modal>
            }
        </article>
    )
}
export default Post;