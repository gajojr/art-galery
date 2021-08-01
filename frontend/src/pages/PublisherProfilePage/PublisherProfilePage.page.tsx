import { ProfilePageContainer } from './PublisherProfilePage.style';

import ProfileData from '../../components/PublisherProfilePageComponents/ProfileData/ProfileData.component';
import InvoicesList from '../../components/PublisherProfilePageComponents/PostList/PostList.component';

const ProfilePage = () => {
    return (
        <ProfilePageContainer>
            <ProfileData />
            <InvoicesList />
        </ProfilePageContainer>
    )
}

export default ProfilePage;
