import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getImage } from '../../../redux/actions/images';
import { PostCard, PostInfo } from './PostCard.style';

import { PostInterface } from '../PostInteface';
import ImageDispatcherInterface from './ImageDispatcherInterface';

const PostCardComponent = ({ post }: { post: PostInterface }) => {
    const dispatch = useDispatch();
    const imageLocation = useSelector(({ images }: { images: ImageDispatcherInterface }) => images.imageUrl);
    const loading = useSelector(({ images }: { images: ImageDispatcherInterface }) => images.loading);
    const error = useSelector(({ images }: { images: ImageDispatcherInterface }) => images.error);

    useEffect(() => {
        dispatch(getImage(post.id));
    }, [dispatch, post.id]);

    return (
        <PostCard>
            {loading && <p>Loading...</p>}
            {post && <>
                <PostInfo>
                    <p>Category: {post.category}</p>
                    <p>Uploaded: {post.date_of_making}</p>
                    <p>Description: {post.description}</p>
                    <p>Likes: {post.num_of_likes || 0}</p>
                </PostInfo>
                <img src={imageLocation} alt="post" />
            </>}
            {error && !loading && <p>{error}</p>}
        </PostCard>
    )
}

export default PostCardComponent;
