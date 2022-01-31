import useSWRInfinite from 'swr/infinite';
import { getAuth } from './apiHandler';

export const usePagination = (BASE_URL, JWT) => {
    const PAGE_SIZE = 4;

    const fetcher = (url) => getAuth(url, JWT).then((r) => r.json());
    const getKey = (pageIndex, previousPageData) => {
        // if(previousPageData && !previousPageData.length) return null; THIS LINE BREAKS ENTIRE THING
        return `${BASE_URL}?page=${pageIndex}&limit=${PAGE_SIZE}`;
    }

    const { data: posts, error, size, setSize, mutate, isValidating } = useSWRInfinite(getKey, fetcher);

    const fetchNextPage = () => setSize(size + 1);
    const paginatedPosts = posts?.flat();
    const isReachedEnd = posts && posts[posts.length - 1]?.status == 'fail';
    const loadingMore = posts && typeof posts[size-1] === "undefined";

    return {
        paginatedPosts,
        isReachedEnd,
        loadingMore,
        error,
        fetchNextPage,
        mutate,
        isValidating
    }
};