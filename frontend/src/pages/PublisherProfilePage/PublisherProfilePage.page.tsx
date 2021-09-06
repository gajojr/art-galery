import { ProfilePageContainer } from './PublisherProfilePage.style';

import ProfileData from '../../components/PublisherProfilePageComponents/ProfileData/ProfileData.component';
import PostList from '../../components/PublisherProfilePageComponents/PostList/PostList.component';

const ProfilePage = () => {
  return (
    <ProfilePageContainer>
      <ProfileData />
      {/* <PostList /> */}
    </ProfilePageContainer>
  )
}

export default ProfilePage;
