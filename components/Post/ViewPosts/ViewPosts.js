import { usePagination } from '../../../utils/hooks';
import Post from '../Post';

const ViewPost = ({ jwt, currentUsersID, BASE_URL}) => {

    const { paginatedPosts, isReachedEnd, loadingMore, error, fetchNextPage } = usePagination(BASE_URL, jwt);
    if(!paginatedPosts) return <div>Loading...</div>
    if(error) return <div>Fetching posts has failed</div>;

    return (
        <div className="posts flex flex-col items-center">
            {
                paginatedPosts?.map((page) => {
                    return page.data?.map((post, index) => {
                        return <Post key={index} {...post} currentUsersID={currentUsersID} jwt={jwt} isSingle={false}/>
                    })
                })
            }
            {loadingMore && <div>Loading...</div>}
            {!isReachedEnd && <button onClick={fetchNextPage} className="btn">Load More</button>}
        </div>
    )

}
export default ViewPost;