import { useState, useEffect } from 'react';
import axios from 'axios';

import { PostInterface } from '../PostInterface';
import { CardsContainer, CardContainer } from './PostList.styles';
import PostCard from '../PostCard/PostCard.component';

const PostsList = () => {
    const [posts, setPosts] = useState<PostInterface[]>([]);

    useEffect(() => {
        (async () => {
            const response = await axios.get('/posts', {
                params: {
                    username: sessionStorage.getItem('username')
                }
            });
            console.log(response);
            setPosts(response.data);
        })();
    }, []);

    if (!posts.length) {
        return <span>You don't have any posts yet</span>
    }

    return (
        <CardsContainer>
            <span>Your posts:</span>
            <CardContainer>
                {posts.map((post: PostInterface, idx: number) => <PostCard key={post.id} post={{ ...post, idx }} />)}
            </CardContainer>
        </CardsContainer>
    )
}

export default PostsList;
