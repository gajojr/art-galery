import { useEffect, useState } from 'react';

import axios from 'axios';

import { PostInterface } from '../PostInterface';

import { message } from 'antd';
import { StyledCard, DeleteButton, PostImage } from './PostCard.style';

const PostCard = ({ post }: { post: PostInterface }) => {
    const [imageLocation, setImageLocation] = useState<string>('');

    useEffect(() => {
        (async () => {
            const response = await axios.get(`/posts/${post.id}`,
                {
                    responseType: 'arraybuffer'
                }
            );

            console.log(response);
            if (response.data.message) {
                message.error(response.data.message);
                return;
            }

            const base64 = btoa(
                new Uint8Array(response.data).reduce(
                    (data, byte) => data + String.fromCharCode(byte),
                    '',
                ),
            );
            setImageLocation("data:;base64," + base64);
        })()
    }, []);

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
            <PostImage src={imageLocation} alt="Post" />
            <p>Caption: {post.description.substring(0, 150)}</p>
        </StyledCard>
    )
}

export default PostCard;
