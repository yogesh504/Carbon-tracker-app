import { Routes, Route, useNavigate, Navigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import VerifyOtp from "./components/Auth/VerifyOtp";
import ResetPassword from "./components/Auth/ResetPassword";
import ActivityForm from "./components/ActivityForm";
import Dashboard from "./components/Dashboard";
import Leaderboard from "./components/Leaderboard";
import Achievements from "./components/Achievements";
import ProfilePage from "./components/ProfilePage";
import Goals from "./pages/Goals";
import Home from "./pages/Home";
import Offset from "./pages/Offset";
import Navbar from "./components/Navbar";
import LearnMore from "./pages/LearnMore";
import ForgotPassword from "./pages/ForgotPassword";

function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setUser({ token });
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    navigate("/");
  };

  const PrivateRoute = ({ element }) => {
    return user ? element : <Navigate to="/login" />;
  };

  // Hide navbar on these routes
  const hideNavbarRoutes = ["/login", "/register", "/forgot-password", "/verify-otp", "/reset-password"];
  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {!shouldHideNavbar && <Navbar user={user} setUser={setUser} />}
      <Routes>
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/" element={<PrivateRoute element={<Home />} />} />
        <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
        <Route path="/activity" element={<PrivateRoute element={<ActivityForm />} />} />
        <Route path="/goals" element={<PrivateRoute element={<Goals />} />} />
        <Route path="/achievements" element={<PrivateRoute element={<Achievements />} />} />
        <Route path="/leaderboard" element={<PrivateRoute element={<Leaderboard />} />} />
        <Route path="/profile" element={<PrivateRoute element={<ProfilePage />} />} />
        <Route path="/offset" element={<PrivateRoute element={<Offset />} />} />
        <Route path="/learn-more" element={<PrivateRoute element={<LearnMore />} />} />
      </Routes>
      <ToastContainer position="top-center" autoClose={2000} />
    </>
  );
}

export default App;
