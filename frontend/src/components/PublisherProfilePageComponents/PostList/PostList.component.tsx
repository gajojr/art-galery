import { useState, useEffect } from 'react';
import axios from 'axios';

import { PostInterface } from '../PostInterface';
import { CardsContainer, CardContainer } from './PostList.styles';
import PostCard from '../PostCard/PostCard.component';

const InvoicesList = () => {
    const [posts, setInvoices] = useState<any>([]);

    useEffect(() => {
        (async () => {
            const response = await axios.get('/posts', {
                params: {
                    username: sessionStorage.getItem('username')
                }
            });
            console.log(response);
            setInvoices(response.data);
        })();
    }, []);

    if (!posts.length) {
        return <span>You don't have any posts yet</span>
    }

    return (
        <CardsContainer>
            <span>Your posts:</span>
            <CardContainer>
                {posts.map((post: PostInterface) => <PostCard key={post.id} post={post} />)}
            </CardContainer>
        </CardsContainer>
    )
}

export default InvoicesList;
