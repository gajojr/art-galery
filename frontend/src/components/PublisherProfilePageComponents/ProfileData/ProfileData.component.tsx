import { useState, useEffect } from 'react';
import axios from 'axios';
import { Image, message } from 'antd';

import { ProfileCard, ProfileInfo, Username, StyledButton } from './ProfileData.style';

const ProfileData = () => {
  const [avatarURL, setAvatarURL] = useState<string>('');

  useEffect(() => {
    if (!sessionStorage.getItem('username')) {
      // redirect if user isn't logged in
      sessionStorage.clear();
      window.location.href = '/';
    }

    (async () => {
      try {
        const response = await axios
          .get(
            '/auth/avatar',
            {
              headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
              },
              params: {
                username: sessionStorage.getItem('username')
              }
            }
          )

        setAvatarURL(response.data);
      } catch (err: any) {
        // log off, clear storage
        message.error(err.response.data.message);
        sessionStorage.clear();
        window.location.href = '/';
      }
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
