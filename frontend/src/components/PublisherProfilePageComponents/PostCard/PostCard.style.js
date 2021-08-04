import styled from 'styled-components';

import { Button, Card, Image } from 'antd';

export const StyledCard = styled(Card)
`
    display: flex;
    flex-direction: column;
    width: 20vw;

    @media(max-width: 992px) {
        width: 25vw;
    }

    @media(max-width: 700px) {
        width: 33vw;
    }

    @media(max-width: 490px) {
        width: 100%;
    }
`;

export const DeleteButton = styled(Button)
`
    margin-left: 5px;
    background-color: #ff3333;
    border: none;

    &:hover {
        background-color: #e60000;
    }
`;

export const PostImage = styled(Image)
`
    width: 100%;
    height: 60%;
`;

export const PostInfo = styled.div `
    display: flex;
    justify-content: space-between;
`;

export const NumOfLikes = styled.p `
    display: flex;
    align-items: center;
`;