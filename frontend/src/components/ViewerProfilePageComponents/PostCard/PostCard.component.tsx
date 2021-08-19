import { useState, useEffect } from 'react';
import { PostCard, PostInfo } from './PostCard.style';

import axios from 'axios';
import { message } from 'antd';

import { PostInterface } from '../PostInteface';

const PostCardComponent = ({ post }: { post: PostInterface }) => {
    const [imageLocation, setImageLocation] = useState<string>('');

    useEffect(() => {
        (async () => {
            const response = await axios.get(`/user-posts/${post.id}`,
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
        })();
    }, [post.id]);

    return (
        <PostCard>
            <PostInfo>
                <p>Category: {post.category}</p>
                <p>Uploaded: {post.date_of_making}</p>
                <p>Description: {post.description}</p>
                <p>Likes: {post.num_of_likes || 0}</p>
            </PostInfo>
            <img src={imageLocation} alt="post" />
        </PostCard>
    )
}

export default PostCardComponent;
