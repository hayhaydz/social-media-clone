import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { usePagination } from '../../../utils/hooks';
import Post from '../Post';

const ViewPost = ({ jwt, currentUsersID, BASE_URL}) => {
    const router = useRouter();
    const [isUpdated, setIsUpdated] = useState(false);

    const { paginatedPosts, isReachedEnd, loadingMore, error, fetchNextPage, mutate, isValidating } = usePagination(BASE_URL, jwt);

    useEffect(() => {
        if(router.query.msg && isUpdated === false) {
            setIsUpdated(true);
            mutate();
        }
        setTimeout(() => {
            setIsUpdated(false);
        }, 1000);
    });

    if(!paginatedPosts) return <div>Loading...</div>
    if(error) return <div>Fetching posts has failed</div>;

    return (
        <div className="posts flex flex-col items-center">
            {
                paginatedPosts?.map((page) => {
                    return page.data?.map((post, index) => {
                        return <Post key={index} {...post} currentUsersID={currentUsersID} jwt={jwt} isSingle={false} mutate={mutate}/>
                    })
                })
            }
            {loadingMore && <div>Loading...</div>}
            {!isReachedEnd && <button onClick={fetchNextPage} className="btn">Load More</button>}
        </div>
    )

}
export default ViewPost;