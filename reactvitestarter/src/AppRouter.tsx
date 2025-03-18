import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminPage from "./pages/AdminPage";
import ProfilePage from "./pages/ProfilePage";
import UserDetails from "./components/UserDetails";
import ProfileCard from "./components/ProfileCard";

const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/admin/*" element={<AdminPage />} />
      <Route path="/admin/users" element={<AdminPage />} />
      <Route path="/admin/users/:id" element={<ProfileCard />} />
      <Route path="/profile" element={<ProfilePage />} />
    </Routes>
  </BrowserRouter>
);

export default AppRouter;
