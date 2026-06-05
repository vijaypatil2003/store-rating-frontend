import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminUsers from "./pages/admin/Users";
import AdminStores from "./pages/admin/Stores";
import AdminAddUser from "./pages/admin/AddUser";
import AdminAddStore from "./pages/admin/AddStore";
import AdminUserDetail from "./pages/admin/UserDetail";
import UserStores from "./pages/user/Stores";
import UserChangePassword from "./pages/user/ChangePassword";
import OwnerDashboard from "./pages/owner/Dashboard";
import OwnerChangePassword from "./pages/owner/ChangePassword";

const PrivateRoute = ({ children, role }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  if (role && user.role !== role) return <Navigate to="/login" />;
  return children;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/admin/dashboard" element={<PrivateRoute role="admin"><AdminDashboard /></PrivateRoute>} />
        <Route path="/admin/users" element={<PrivateRoute role="admin"><AdminUsers /></PrivateRoute>} />
        <Route path="/admin/users/add" element={<PrivateRoute role="admin"><AdminAddUser /></PrivateRoute>} />
        <Route path="/admin/users/:id" element={<PrivateRoute role="admin"><AdminUserDetail /></PrivateRoute>} />
        <Route path="/admin/stores" element={<PrivateRoute role="admin"><AdminStores /></PrivateRoute>} />
        <Route path="/admin/stores/add" element={<PrivateRoute role="admin"><AdminAddStore /></PrivateRoute>} />

        <Route path="/user/stores" element={<PrivateRoute role="user"><UserStores /></PrivateRoute>} />
        <Route path="/user/change-password" element={<PrivateRoute role="user"><UserChangePassword /></PrivateRoute>} />

        <Route path="/owner/dashboard" element={<PrivateRoute role="owner"><OwnerDashboard /></PrivateRoute>} />
        <Route path="/owner/change-password" element={<PrivateRoute role="owner"><OwnerChangePassword /></PrivateRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
