import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { PlusCircleIcon } from '@heroicons/react/outline';
import { usePagination } from '../../../utils/hooks';
import { Success, Error, Modal, CreatePost } from '../../';
import Post from '../Post';

const ViewPost = ({ jwt, currentUser, BASE_URL, PUBLIC_URL}) => {
    const router = useRouter();
    const [feedbackMsg, setFeedbackMsg] = useState({isError: '', text: ''});
    const [isCreating, setIsCreating] = useState(false);

    useEffect(() => {
        if(feedbackMsg.text !== '') {
            setTimeout(() => {
                setFeedbackMsg({
                    ...feedbackMsg,
                    text: ''
                });
            }, 3000);
        }
    }, [feedbackMsg]);

    const { paginatedPosts, isReachedEnd, loadingMore, error, fetchNextPage, mutate, isValidating } = usePagination(BASE_URL, jwt);

    if(!paginatedPosts) return <div>Loading...</div>
    if(error) return <div>Fetching posts has failed</div>;

    return (
        <div>
            {router.pathname == '/home' &&
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <span className="block mb-2 mt-8 font-medium">Welcome back,</span>
                        <h1 className="uppercase !text-5xl font-bold">{`${currentUser.first_name} ${currentUser.last_name}`}</h1>
                    </div>
                    <button className="btn btn-primary modal-button" onClick={() => setIsCreating(!isCreating)}><PlusCircleIcon className="w-6 h-6 mx-2" /> Create post</button>
                </div>
            }


            <div className="posts flex flex-col items-center">
                {feedbackMsg.text !== '' &&
                    <>
                        {feedbackMsg.isError ?
                            <Error text={feedbackMsg.text} />
                            : <Success text={feedbackMsg.text} />
                        }
                    </>
                }

                {
                    paginatedPosts?.map((page) => {
                        return page.data?.map((post, index) => {
                            return <Post key={index} {...post} currentUsersID={currentUser.user_id} jwt={jwt} PUBLIC_URL={PUBLIC_URL} isSingle={false} mutate={mutate} setFeedbackMsg={setFeedbackMsg}/>
                        })
                    })
                }

                {loadingMore && <div>Loading...</div>}
                {!isReachedEnd && <button onClick={fetchNextPage} className="btn">Load More</button>}

                {isCreating &&
                    <Modal id="createModal"><CreatePost jwt={jwt} setIsCreating={setIsCreating} mutate={mutate} /></Modal>
                }
            </div>
        </div>

    )

}
export default ViewPost;