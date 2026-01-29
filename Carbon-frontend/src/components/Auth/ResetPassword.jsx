import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { FaLock } from "react-icons/fa";
import { toast } from "react-toastify";

function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";

  const [form, setForm] = useState({ newPassword: "", confirmPassword: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate password length
    if (form.newPassword.length < 8) {
      toast.error("Password must be at least 8 characters long", {
        autoClose: 3000,
      });
      return;
    }

    // Validate passwords match
    if (form.newPassword !== form.confirmPassword) {
      toast.error("Passwords do not match", { autoClose: 3000 });
      return;
    }

    // Check if email exists
    if (!email) {
      toast.error("Email not found. Please start the reset process again.", {
        autoClose: 3000,
      });
      navigate("/forgot-password");
      return;
    }

    try {
      setLoading(true);
      await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/reset-password`, {
        email,
        newPassword: form.newPassword,
      });
      toast.success("Password reset successful. Please log in.", {
        autoClose: 2000,
      });
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      toast.error(err.response?.data?.message || "Password reset failed", {
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white flex items-center justify-center">
      <motion.div
        className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl w-[95%] max-w-md p-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col items-center mb-6">
          <div className="bg-white p-3 rounded-full shadow mb-2">
            <FaLock className="text-2xl text-blue-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-900">Reset Password</h2>
          <p className="text-sm text-gray-500 text-center mt-1">
            Enter your new password below
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center bg-white border rounded px-3 py-2 shadow-sm">
            <FaLock className="text-gray-400 mr-2" />
            <input
              type="password"
              name="newPassword"
              placeholder="New Password"
              className="outline-none w-full"
              value={form.newPassword}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex items-center bg-white border rounded px-3 py-2 shadow-sm">
            <FaLock className="text-gray-400 mr-2" />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm New Password"
              className="outline-none w-full"
              value={form.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 rounded bg-gradient-to-r from-black via-gray-800 to-black text-white font-semibold shadow-md hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>

          <p className="mt-6 text-center text-sm text-gray-600">
            Remember your password?{" "}
            <Link to="/login" className="text-blue-600 hover:underline font-medium">
              Login
            </Link>
          </p>
        </form>
      </motion.div>
    </div>
  );
}

export default ResetPassword;
