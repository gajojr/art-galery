import { ProfilePageContainer } from './ViewerProfilePage.style';

import ProfileData from '../../components/ViewerProfilePageComponents/ProfileData/ProfileData.component';
import SearchBar from '../../components/ViewerProfilePageComponents/SearchBar/SearchBar.component';
import PostList from '../../components/ViewerProfilePageComponents/PostList/PostList.component';

const ViewerProfilePage = () => {
  return (
    <ProfilePageContainer>
      <ProfileData />
      {/* <SearchBar />*/}
      <PostList />
    </ProfilePageContainer>
  )
}

export default ViewerProfilePage;
