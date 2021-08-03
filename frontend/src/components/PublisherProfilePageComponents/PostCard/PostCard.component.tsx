import axios from 'axios';

import { Link } from 'react-router-dom';

import { PostInterface } from '../PostInterface';

import { message } from 'antd';
import { StyledCard, DeleteButton } from './PostCard.style';

const PostCard = ({ post }: { post: PostInterface }) => {
    const deleteInvoice = async (id: number) => {
        if (window.confirm('Do you want to delete this post?')) {
            const response = await axios.delete(`/posts/${id}`, {
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
                    <DeleteButton type="primary" onClick={() => deleteInvoice(post.id)}>Delete</DeleteButton>
                </div>
            }
        >
            <p>Caption: {post.description.substring(0, 150)}</p>
        </StyledCard>
    )
}

export default PostCard;
