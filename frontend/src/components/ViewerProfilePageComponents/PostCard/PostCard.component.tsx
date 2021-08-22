import { PostCard, PostInfo } from './PostCard.style';

import { PostInterface } from '../PostInteface';

const PostCardComponent = ({ post }: { post: PostInterface }) => {
    return (
        <PostCard>
            <PostInfo>
                <p>Category: {post.category}</p>
                <p>Uploaded: {post.date_of_making}</p>
                <p>Description: {post.description}</p>
                <p>Likes: {post.num_of_likes || 0}</p>
            </PostInfo>
            <img src={post.document_location} alt="post" />
        </PostCard>
    )
}

export default PostCardComponent;
