import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { FaEnvelope, FaLock, FaUser, FaKey } from "react-icons/fa";
import { toast } from "react-toastify";

function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "", otp: "" });
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [sendingOtp, setSendingOtp] = useState(false);
  const [verifyingOtp, setVerifyingOtp] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Only allow digits for OTP and limit to 6 characters
    if (name === "otp" && (!/^\d*$/.test(value) || value.length > 6)) {
      return;
    }
    setForm({ ...form, [name]: value });
  };

  const handleSendOtp = async () => {
    if (!form.email) {
      toast.error("Please enter your email first", { autoClose: 3000 });
      return;
    }
    try {
      setSendingOtp(true);
      await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/send-otp`, {
        email: form.email,
      });
      setOtpSent(true);
      toast.success("OTP sent to your email!", { autoClose: 2000 });
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send OTP", {
        autoClose: 3000,
      });
    } finally {
      setSendingOtp(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (form.otp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP", { autoClose: 3000 });
      return;
    }
    try {
      setVerifyingOtp(true);
      await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/verify-otp`, {
        email: form.email,
        otp: form.otp,
      });
      setOtpVerified(true);
      toast.success("Email verified successfully!", { autoClose: 2000 });
    } catch (err) {
      toast.error(err.response?.data?.message || "OTP verification failed", {
        autoClose: 3000,
      });
    } finally {
      setVerifyingOtp(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!otpVerified) {
      toast.error("Please verify your email first", { autoClose: 3000 });
      return;
    }
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
        name: form.name,
        email: form.email,
        password: form.password,
      });
      toast.success("Registered successfully! You can now log in.", {
        autoClose: 2000,
      });
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed", {
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
            <FaUser className="text-2xl text-blue-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-900">Create your account</h2>
          <p className="text-sm text-gray-500 text-center mt-1">
            Start your sustainable journey with us!
          </p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          <div className="flex items-center bg-white border rounded px-3 py-2 shadow-sm">
            <FaUser className="text-gray-400 mr-2" />
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="outline-none w-full"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center bg-white border rounded px-3 py-2 shadow-sm flex-1">
              <FaEnvelope className="text-gray-400 mr-2" />
              <input
                type="email"
                name="email"
                placeholder="Email"
                className={`outline-none w-full ${otpSent ? "bg-gray-50 text-gray-500" : ""}`}
                value={form.email}
                onChange={handleChange}
                readOnly={otpSent}
                required
              />
            </div>
            {!otpVerified && (
              <button
                type="button"
                onClick={handleSendOtp}
                disabled={sendingOtp || !form.email}
                className="px-3 py-2 rounded bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
              >
                {sendingOtp ? "Sending..." : otpSent ? "Resend" : "Send OTP"}
              </button>
            )}
            {otpVerified && (
              <span className="text-green-600 text-sm font-medium whitespace-nowrap">✓ Verified</span>
            )}
          </div>

          {otpSent && !otpVerified && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.3 }}
              className="space-y-2"
            >
              <div className="flex items-center gap-2">
                <div className="flex items-center bg-white border rounded px-3 py-2 shadow-sm flex-1">
                  <FaKey className="text-gray-400 mr-2" />
                  <input
                    type="text"
                    name="otp"
                    placeholder="Enter 6-digit OTP"
                    className="outline-none w-full tracking-widest text-center font-mono"
                    value={form.otp}
                    onChange={handleChange}
                    maxLength={6}
                  />
                </div>
                <button
                  type="button"
                  onClick={handleVerifyOtp}
                  disabled={verifyingOtp || form.otp.length !== 6}
                  className="px-3 py-2 rounded bg-green-600 text-white text-sm font-medium hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                >
                  {verifyingOtp ? "Verifying..." : "Verify"}
                </button>
              </div>
              <p className="text-xs text-gray-500 text-center">
                Check your email for the verification code
              </p>
            </motion.div>
          )}

          <div className="flex items-center bg-white border rounded px-3 py-2 shadow-sm">
            <FaLock className="text-gray-400 mr-2" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className={`outline-none w-full ${!otpVerified ? "bg-gray-50 text-gray-400" : ""}`}
              value={form.password}
              onChange={handleChange}
              disabled={!otpVerified}
              required
            />
          </div>

          <button
            type="submit"
            disabled={!otpVerified}
            className="w-full py-2 rounded bg-gradient-to-r from-black via-gray-800 to-black text-white font-semibold shadow-md hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Create Account
          </button>

          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline font-medium">
              Login
            </Link>
          </p>
        </form>
      </motion.div>
    </div>
  );
}

export default Register;
