import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { FaEnvelope, FaKey } from "react-icons/fa";
import { toast } from "react-toastify";

function VerifyOtp() {
  const navigate = useNavigate();
  const location = useLocation();
  const prefillEmail = location.state?.email || "";

  const [form, setForm] = useState({ email: prefillEmail, otp: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Only allow digits for OTP and limit to 6 characters
    if (name === "otp" && (!/^\d*$/.test(value) || value.length > 6)) {
      return;
    }
    setForm({ ...form, [name]: value });
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    if (form.otp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP", { autoClose: 3000 });
      return;
    }
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/verify-forgot-otp`, {

        email: form.email,
        otp: form.otp,
      });
      toast.success("OTP verified successfully.", {
        autoClose: 2000,
      });
      setTimeout(() => {
        navigate("/reset-password", { state: { email: form.email } });
      }, 2000);
    } catch (err) {
      toast.error(err.response?.data?.message || "OTP verification failed", {
        autoClose: 3000,
      });
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
            <FaKey className="text-2xl text-blue-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-900">Verify OTP</h2>
          <p className="text-sm text-gray-500 text-center mt-1">
            Enter the 6-digit OTP sent to your email
          </p>
        </div>

        <form onSubmit={handleVerify} className="space-y-4">
          <div className="flex items-center bg-white border rounded px-3 py-2 shadow-sm">
            <FaEnvelope className="text-gray-400 mr-2" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className={`outline-none w-full ${prefillEmail ? "bg-gray-50 text-gray-500" : ""}`}
              value={form.email}
              onChange={handleChange}
              readOnly={!!prefillEmail}
              required
            />
          </div>

          <div className="flex items-center bg-white border rounded px-3 py-2 shadow-sm">
            <FaKey className="text-gray-400 mr-2" />
            <input
              type="text"
              name="otp"
              placeholder="Enter 6-digit OTP"
              className="outline-none w-full tracking-widest text-center font-mono text-lg"
              value={form.otp}
              onChange={handleChange}
              maxLength={6}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 rounded bg-gradient-to-r from-black via-gray-800 to-black text-white font-semibold shadow-md hover:opacity-90 transition"
          >
            Verify OTP
          </button>

          <p className="mt-6 text-center text-sm text-gray-600">
            Didn't receive the code?{" "}
            <Link to="/register" className="text-blue-600 hover:underline font-medium">
              Register again
            </Link>
          </p>
        </form>
      </motion.div>
    </div>
  );
}

export default VerifyOtp;
