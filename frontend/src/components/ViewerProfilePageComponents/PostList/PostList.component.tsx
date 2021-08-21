import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPosts } from '../../../redux/actions/posts';

import PostCard from '../PostCard/PostCard.component';

import { PostInterface } from '../PostInteface';
import PostDispatcherInterface from './PostDispatcherInterface';

const PostList = () => {
    const dispatch = useDispatch();
    const posts = useSelector(({ posts }: { posts: PostDispatcherInterface }) => posts.posts);
    const loading = useSelector(({ posts }: { posts: PostDispatcherInterface }) => posts.loading);
    const error = useSelector(({ posts }: { posts: PostDispatcherInterface }) => posts.error);

    useEffect(() => {
        dispatch(getPosts());
    }, [dispatch]);

    return (
        <section>
            {loading && <p>Loading...</p>}
            {posts && posts.map((post: PostInterface) => (
                <PostCard key={post.id} post={post} />
            ))}
            {posts.length === 0 && !loading && <p>No users available</p>}
            {error && !loading && <p>{error}</p>}
        </section>
    )
}

export default PostList;
