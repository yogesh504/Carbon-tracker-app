import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { FaEnvelope, FaKey, FaLock, FaCheckCircle } from "react-icons/fa";

function ForgotPassword() {
  const [step, setStep] = useState("email"); // "email" | "otp" | "reset" | "success"
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const API_URL = import.meta.env.VITE_API_URL;

  const handleOtpChange = (e) => {
    const value = e.target.value;
    // Only allow digits and limit to 6 characters
    if (/^\d*$/.test(value) && value.length <= 6) {
      setOtp(value);
    }
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${API_URL}/api/auth/forgot-password`, { email });
      toast.success("OTP sent to your email successfully.");
      setStep("otp");
    } catch (err) {
      toast.error(err.response?.data?.message || "Error sending OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (otp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }
    setLoading(true);
    try {
      await axios.post(`${API_URL}/api/auth/verify-forgot-otp`, { email, otp });
      toast.success("OTP verified successfully.");
      setStep("reset");
    } catch (err) {
      toast.error(err.response?.data?.message || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (newPassword.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      await axios.post(`${API_URL}/api/auth/reset-password`, {
        email,
        newPassword,
      });
      toast.success("Password reset successful. You can now log in.");
      setStep("success");
    } catch (err) {
      toast.error(err.response?.data?.message || "Password reset failed");
    } finally {
      setLoading(false);
    }
  };

  const getStepTitle = () => {
    switch (step) {
      case "email":
        return "Forgot Password";
      case "otp":
        return "Verify OTP";
      case "reset":
        return "Reset Password";
      case "success":
        return "Success!";
      default:
        return "Forgot Password";
    }
  };

  const getStepDescription = () => {
    switch (step) {
      case "email":
        return "Enter your email to receive a one-time password (OTP).";
      case "otp":
        return "Enter the 6-digit OTP sent to your email.";
      case "reset":
        return "Enter your new password below.";
      case "success":
        return "Your password has been reset successfully.";
      default:
        return "";
    }
  };

  const getStepIcon = () => {
    switch (step) {
      case "email":
        return <FaEnvelope className="text-2xl text-blue-600" />;
      case "otp":
        return <FaKey className="text-2xl text-blue-600" />;
      case "reset":
        return <FaLock className="text-2xl text-blue-600" />;
      case "success":
        return <FaCheckCircle className="text-2xl text-green-600" />;
      default:
        return <FaEnvelope className="text-2xl text-blue-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white flex items-center justify-center relative overflow-hidden">
      <motion.div
        className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl w-[95%] max-w-md p-8 z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        key={step}
      >
        <div className="flex flex-col items-center mb-6">
          <div className="bg-white p-3 rounded-full shadow mb-2">
            {getStepIcon()}
          </div>
          <h2 className="text-xl font-bold text-gray-900">
            {getStepTitle()}
          </h2>
          <p className="text-sm text-gray-500 text-center mt-1">
            {getStepDescription()}
          </p>
        </div>

        {/* Step: Email */}
        {step === "email" && (
          <form onSubmit={handleSendOtp} className="space-y-4">
            <div className="flex items-center bg-white border rounded px-3 py-2 shadow-sm">
              <FaEnvelope className="text-gray-400 mr-2" />
              <input
                type="email"
                placeholder="Email address"
                className="outline-none w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 rounded bg-gradient-to-r from-black via-gray-800 to-black text-white font-semibold shadow-md hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>
            <p className="mt-6 text-center text-sm text-gray-600">
              Remember your password?{" "}
              <Link to="/login" className="text-blue-600 hover:underline font-medium">
                Login
              </Link>
            </p>
          </form>
        )}

        {/* Step: OTP */}
        {step === "otp" && (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <div className="flex items-center bg-white border rounded px-3 py-2 shadow-sm">
              <FaEnvelope className="text-gray-400 mr-2" />
              <input
                type="email"
                className="outline-none w-full bg-gray-50 text-gray-500"
                value={email}
                readOnly
              />
            </div>
            <div className="flex items-center bg-white border rounded px-3 py-2 shadow-sm">
              <FaKey className="text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Enter 6-digit OTP"
                className="outline-none w-full tracking-widest text-center font-mono"
                value={otp}
                onChange={handleOtpChange}
                maxLength={6}
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading || otp.length !== 6}
              className="w-full py-2 rounded bg-gradient-to-r from-black via-gray-800 to-black text-white font-semibold shadow-md hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
            <p className="text-center text-sm text-gray-600">
              Didn't receive the code?{" "}
              <button
                type="button"
                onClick={() => setStep("email")}
                className="text-blue-600 hover:underline font-medium"
              >
                Resend OTP
              </button>
            </p>
          </form>
        )}

        {/* Step: Reset Password */}
        {step === "reset" && (
          <form onSubmit={handleResetPassword} className="space-y-4">
            <div className="flex items-center bg-white border rounded px-3 py-2 shadow-sm">
              <FaLock className="text-gray-400 mr-2" />
              <input
                type="password"
                placeholder="New Password"
                className="outline-none w-full"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
            <div className="flex items-center bg-white border rounded px-3 py-2 shadow-sm">
              <FaLock className="text-gray-400 mr-2" />
              <input
                type="password"
                placeholder="Confirm New Password"
                className="outline-none w-full"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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
          </form>
        )}

        {/* Step: Success */}
        {step === "success" && (
          <div className="text-center space-y-4">
            <div className="text-green-600 text-5xl mb-4">✓</div>
            <p className="text-gray-600">
              You can now log in with your new password.
            </p>
            <Link
              to="/login"
              className="block w-full py-2 rounded bg-gradient-to-r from-black via-gray-800 to-black text-white font-semibold shadow-md hover:opacity-90 transition text-center"
            >
              Go to Login
            </Link>
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default ForgotPassword;
