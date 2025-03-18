import { useVisibility } from '../hooks/useVisibility';
import ProfileCard from '../components/ProfileCard';

const ProfilePage = () => {
  const visibleComponents = useVisibility();

  return (
    <div>
      <h1>Profile Page</h1>
      {visibleComponents.includes('ProfileCard') && <ProfileCard />}
    </div>
  );
};

export default ProfilePage;
