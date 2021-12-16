import { Error } from '../../index';
import { XCircleIcon, PhotographIcon } from '@heroicons/react/outline';
import { PhotographIcon as PhotographIconSolid } from '@heroicons/react/solid';

const ManagePost = ({form, postData, setPostData, isEdit = false, handleSubmit, setIsEditing, setIsCreating }) => {
    const handleTextOnChange = async (e) => {
        setPostData({
            ...postData,
            text: e.target.value,
            charCount: e.target.value.length
        })
    }

    const handleImageOnChange = async (e) => {
        let filename;
        if(!e.target.files[0]) {
            filename = '';
        } else {
            filename = e.target.files[0].name;
        }

        setPostData({
            ...postData,
            imageName: filename
        });
    }

    return (
        <div className="p-4 card bg-base-200 w-1/4">
            <div className="flex w-full mb-4 justify-between items-center">
                <span className={(postData.charCount > 480 ? 'text-red-500' : 'text-gray-300') + ' font-bold flex items-center'}>{postData.charCount}/480</span>
                <button className="btn btn-ghost btn-square" id={isEdit ? 'editModalClose' : 'createModalClose'} onClick={() => {isEdit ? setIsEditing(false) : setIsCreating(false);}}><XCircleIcon className="w-6 h-6 mx-2 text-gray-300" /></button>
            </div>
            <form ref={form} action="#" id="form" className="form-control" name="form" encType="multipart/form-data" onSubmit={handleSubmit}>
                <textarea 
                    name="text"
                    id="text"
                    value={postData.text}
                    onChange={handleTextOnChange}
                    className="textarea resize-none h-48 w-full mb-4" 
                    placeholder="What's on your mind?"
                    required
                />
                <div className="flex items-center mb-4">
                    <label htmlFor="post_image" className="btn btn-ghost btn-square">
                        {!postData.imageName ? 
                              <PhotographIcon className="w-8 h-8 text-gray-300" />
                            : <PhotographIconSolid className="w-8 h-8 text-gray-400" />
                        }
                        
                    </label>
                    <input
                        type="file"
                        accept=".jpg, .jpeg, .png"
                        name="post_image"
                        id="post_image"
                        className="invisible h-0 w-0"
                        onChange={handleImageOnChange}
                    />
                    {postData.imageName &&
                        <p className="!m-0 !ml-2 text-gray-400">{postData.imageName}</p>
                    }
                </div>

                <button type="submit" className="btn btn-primary">{isEdit ? 'update post' : 'post'}</button>
                {postData.error && 
                    <Error text={postData.error}/>
                }
            </form>
        </div>
    )
}
export default ManagePost;