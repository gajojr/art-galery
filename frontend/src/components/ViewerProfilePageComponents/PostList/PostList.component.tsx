import { useState, useEffect } from 'react';
import axios from 'axios';

import PostCard from '../PostCard/PostCard.component';

import { PostInterface } from '../PostInteface';

const PostList = () => {
    const [posts, setPosts] = useState<PostInterface[]>([]);

    useEffect(() => {
        (async () => {
            const response = await axios.get('/posts');
            console.log(response.data);

            setPosts(response.data);
        })();
    }, []);

    return (
        <section>
            {posts && posts.map(post => (
                <PostCard key={post.id} post={post} />
            ))}
        </section>
    )
}

export default PostList;
