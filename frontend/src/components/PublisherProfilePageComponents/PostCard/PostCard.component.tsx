import { useEffect, useState } from 'react';

import axios from 'axios';

import { PostInterface } from '../PostInterface';

import { message } from 'antd';
import { StyledCard, DeleteButton, PostImage, PostInfo, NumOfLikes } from './PostCard.style';

import { AiFillHeart } from 'react-icons/ai';

const PostCard = ({ post }: { post: PostInterface }) => {
    const [imageLocation, setImageLocation] = useState<string>('');

    useEffect(() => {
        (async () => {
            const response = await axios.get(`/user-posts/${post.id}`);

            setImageLocation(response.data);
        })()
    }, [post.id]);

    const deletePost = async (id: number) => {
        if (window.confirm('Do you want to delete this post?')) {
            const response = await axios.delete(`/user-posts/${id}`, {
                headers: {
                    'x-access-token': sessionStorage.getItem('token')
                }
            });
            console.log(response);
            if (response.status === 201) {
                message.success('Post deleted!');
                window.location.reload();
            } else {
                message.error('deleting failed');
            }
        }
    }

    return (
        <StyledCard
            size="small"
            title={post.idx + 1}
            extra={
                <div>
                    <DeleteButton type="primary" onClick={() => deletePost(post.id)}>Delete</DeleteButton>
                </div>
            }
        >
            <PostImage src={imageLocation} alt="Post" />
            <PostInfo style={{ display: 'flex', justifyContent: 'space-between' }}>
                <p>Caption: {post.description.substring(0, 150)} </p>
                <NumOfLikes>{post.num_of_likes} <AiFillHeart size={20} /></NumOfLikes>
            </PostInfo>
        </StyledCard>
    )
}

export default PostCard;
