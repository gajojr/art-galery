import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProfileImage } from '../../../redux/actions/profileImages';
import { Image } from 'antd';

import { ProfileCard, ProfileInfo, Username, StyledButton } from './ProfileData.style';

import ImageDispatcherInterface from '../ImageDispatcherInterface';

const ProfileData = () => {
    const dispatch = useDispatch();
    const imageLocation = useSelector(({ profileImages }: { profileImages: ImageDispatcherInterface }) => profileImages.imageUrl);
    const loading = useSelector(({ profileImages }: { profileImages: ImageDispatcherInterface }) => profileImages.loading);
    const error = useSelector(({ profileImages }: { profileImages: ImageDispatcherInterface }) => profileImages.error);

    useEffect(() => {
        if (!sessionStorage.getItem('username')) {
            // redirect if user isn't logged in
            window.location.href = '/';
        }

        dispatch(getProfileImage());
    }, [dispatch]);

    const logOff = () => {
        if (window.confirm('do you want to log off?')) {
            sessionStorage.clear();
            window.location.href = '/';
        }
    }

    return (
        <ProfileCard>
            {loading && <p>Loading...</p>}
            {imageLocation && <>
                <ProfileInfo>
                    <Username>{`${sessionStorage.getItem('username')}`}</Username>
                    <Image src={imageLocation} width={100} height={100} style={{ borderRadius: '50%', border: '1px solid black' }} alt="avatar" />
                </ProfileInfo>
                <StyledButton onClick={logOff}>log off</StyledButton>
            </>}
            {error && !loading && <p>{error}</p>}
        </ProfileCard>
    )
}

export default ProfileData;
