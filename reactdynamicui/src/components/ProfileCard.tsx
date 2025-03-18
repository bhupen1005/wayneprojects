import { useVisibility } from "../hooks/useVisibility";
import EditUserButton from "./EditUserButton";
import UserDetails from "./UserDetails";

const ProfileCard = () => {
  const visibleComponents = useVisibility();

  return (
    <div>
      {visibleComponents.includes("UserDetails") && <UserDetails />}
      {visibleComponents.includes("EditUserButton") && <EditUserButton />}
    </div>
  );
};
export default ProfileCard;
