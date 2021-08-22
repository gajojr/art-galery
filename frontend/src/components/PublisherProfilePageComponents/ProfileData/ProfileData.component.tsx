import { useState, useEffect } from 'react';
import axios from 'axios';
import { Image } from 'antd';

import { ProfileCard, ProfileInfo, Username, StyledButton } from './ProfileData.style';

const ProfileData = () => {
    const [avatarURL, setAvatarURL] = useState<string>('');

    useEffect(() => {
        if (!sessionStorage.getItem('username')) {
            // redirect if user isn't logged in
            window.location.href = '/';
        }

        (async () => {
            const response = await axios
                .get(
                    `/get-avatar`,
                    {
                        headers: {
                            'x-access-token': sessionStorage.getItem('token')
                        },
                        params: {
                            username: sessionStorage.getItem('username')
                        }
                    }
                )

            console.log(response.data);
            setAvatarURL(response.data);
        })();
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
