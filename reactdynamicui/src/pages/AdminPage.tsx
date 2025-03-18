import { useVisibility } from "../hooks/useVisibility";
import AddUserButton from "../components/AddUserButton";
import UserList from "../components/UserList";

const AdminPage = () => {
  const visibleComponents = useVisibility();

  return (
    <div>
      <h1>Admin Page</h1>
      {visibleComponents.includes("AddUserButton") && <AddUserButton />}
      {visibleComponents.includes("UserList") && <UserList />}
    </div>
  );
};

export default AdminPage;
