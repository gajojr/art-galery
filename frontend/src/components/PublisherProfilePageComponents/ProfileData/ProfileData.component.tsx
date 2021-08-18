import { useState, useEffect } from 'react';
import axios from 'axios';
import { Image, message } from 'antd';

import { ProfileCard, ProfileInfo, Username, StyledButton } from './ProfileData.style';

const ProfileData = () => {
    const [avatarURL, setAvatarURL] = useState<string>('');

    useEffect(() => {
        if (!sessionStorage.getItem('username')) {
            // redirect if user isn't logged in
            window.location.href = '/';
        }

        axios
            .get(
                `/get-avatar`,
                {
                    headers: {
                        'x-access-token': sessionStorage.getItem('token')
                    },
                    params: {
                        username: sessionStorage.getItem('username')
                    },
                    responseType: 'arraybuffer'
                }
            )
            .then(response => {
                console.log(response.data);
                if (response.headers['content-type'] === 'application/json; charset=utf-8') {
                    message.error('You are not authenticated');
                    sessionStorage.clear();
                    window.location.href = '/';
                    return;
                }
                const base64 = btoa(
                    new Uint8Array(response.data).reduce(
                        (data, byte) => data + String.fromCharCode(byte),
                        '',
                    ),
                );
                setAvatarURL("data:;base64," + base64);
            })
            .catch(err => console.log(err));
    }, []);

    const logOff = () => {
        if (window.confirm('do you want to log off?')) {
            sessionStorage.clear();
            window.location.href = '/';
        }
    }

    return (
        <ProfileCard>
            <ProfileInfo>
                <Username>{`${sessionStorage.getItem('username')}`}</Username>
                <Image src={avatarURL} width={100} height={100} style={{ borderRadius: '50%', border: '1px solid black' }} alt="avatar" />
            </ProfileInfo>
            <StyledButton onClick={logOff}>log off</StyledButton>
            <StyledButton onClick={() => window.location.href = '/create-post'}>upload new post</StyledButton>
        </ProfileCard>
    )
}

export default ProfileData;
