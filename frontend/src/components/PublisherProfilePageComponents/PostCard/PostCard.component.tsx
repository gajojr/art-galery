import axios from 'axios';

import { Link } from 'react-router-dom';

import { PostInterface } from '../PostInterface';

import { message } from 'antd';
import { StyledCard, DeleteButton, UpdateButton } from './PostCard.style';

const PostCard = ({ post }: { post: PostInterface }) => {
    const deleteInvoice = async (id: number) => {
        if (window.confirm('Do you want to delete this post?')) {
            const response = await axios.delete(`http://localhost:5000/invoices/${id}`);
            console.log(response);
            if (response.status === 200) {
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
            title={post.id}
            extra={
                <div>
                    <Link to={`/posts/${post.id}`}>View</Link>
                    <UpdateButton onClick={() => window.location.href = `/update-post/${post.id}`}>Update</UpdateButton>
                    <DeleteButton type="primary" onClick={() => deleteInvoice(post.id)}>Delete</DeleteButton>
                </div>
            }
        >
            <p>Capiton: {post.description.substring(0, 150)}</p>
            <Link to={`/posts/${post.id}`}><p style={{ color: '#000' }}>...</p></Link>
        </StyledCard>
    )
}

export default PostCard;
