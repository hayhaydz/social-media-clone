import { Error } from '../../index';
import { XCircleIcon } from '@heroicons/react/outline';

const ManagePost = ({postData, isEdit = false, setPostData, handleSubmit, setIsEditing }) => {
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
                <label htmlFor={isEdit ? 'editModal' : 'createModal'} className="btn btn-ghost btn-square" id={isEdit ? 'editModalClose' : 'createModalClose'} onClick={() => {isEdit ? setIsEditing(false) : null}}><XCircleIcon className="w-6 h-6 mx-2 text-gray-300" /></label>
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
                <button type="submit" className="btn btn-primary">{isEdit ? 'update post' : 'post'}</button>
                {postData.error && 
                    <Error text={postData.error}/>
                }
            </form>
        </div>
    )
}
export default ManagePost;