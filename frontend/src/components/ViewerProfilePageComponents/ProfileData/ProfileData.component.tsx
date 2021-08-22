import { useState, useEffect } from 'react';
import { Image } from 'antd';

import { ProfileCard, ProfileInfo, Username, StyledButton } from './ProfileData.style';

import axios from 'axios';

const ProfileData = () => {
    const [imageLocation, setImageLocation] = useState('');

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

            setImageLocation(response.data);
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
                <Image src={imageLocation} width={100} height={100} style={{ borderRadius: '50%', border: '1px solid black' }} alt="avatar" />
            </ProfileInfo>
            <StyledButton onClick={logOff}>log off</StyledButton>
        </ProfileCard>
    )
}

export default ProfileData;
