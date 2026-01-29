import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import {
  FaLeaf,
  FaUser,
  FaEnvelope,
  FaLock,
  FaSave,
  FaArrowLeft,
  FaArrowRight,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaGithub,
  FaPhone,
  FaMapMarkerAlt,
  FaShieldAlt,
  FaCrown,
  FaCalendarAlt,
  FaCheckCircle,
  FaEdit,
} from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";

function ProfilePage() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    name: "",
    email: "",
  });
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const token = localStorage.getItem("token");
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API_URL}/api/users/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProfile(res.data);
      } catch (err) {
        toast.error("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token, API_URL]);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
    if (!isEditing) setIsEditing(true);
  };

  const handleUpdate = async () => {
    try {
      setSaving(true);
      const res = await axios.put(
        `${API_URL}/api/users/me`,
        {
          name: profile.name,
          email: profile.email,
          password,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setProfile(res.data);
      setPassword("");
      setIsEditing(false);
      toast.success("Profile updated successfully");
    } catch (err) {
      toast.error("Error updating profile");
    } finally {
      setSaving(false);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* ==================== BACKGROUND (Same as Achievements/Leaderboard) ==================== */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 via-white to-teal-50/30" />

        {/* Floating Circles */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-200/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/3 right-0 w-96 h-96 bg-teal-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-green-200/15 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-emerald-300/10 rounded-full blur-3xl animate-pulse" />

        {/* Additional decorative circles */}
        <div className="absolute top-1/2 right-10 w-48 h-48 bg-amber-200/15 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-10 w-56 h-56 bg-purple-200/10 rounded-full blur-3xl" />

        {/* Subtle Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23059669' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        {/* Leaf Decorations */}
        <svg
          className="absolute top-40 right-20 w-24 h-24 text-emerald-200/30 rotate-12"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z" />
        </svg>
        <svg
          className="absolute bottom-60 left-16 w-20 h-20 text-teal-200/25 -rotate-45"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z" />
        </svg>
        <svg
          className="absolute top-1/3 left-8 w-16 h-16 text-amber-200/20 rotate-45"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z" />
        </svg>
      </div>

      {/* ==================== MAIN CONTENT ==================== */}
      <div className="max-w-4xl mx-auto px-6 pt-12 pb-20 relative">
        {/* Page Header */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg shadow-emerald-200 mb-5 relative"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <FaUser className="text-white text-3xl" />
            {/* Sparkle effect */}
            <motion.div
              className="absolute -top-1 -right-1"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5 }}
            >
              <HiSparkles className="text-amber-400 text-lg" />
            </motion.div>
          </motion.div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-800 mb-4">
            My{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500">
              Profile
            </span>
          </h1>

          <p className="text-slate-600 text-base md:text-lg max-w-xl mx-auto">
            Manage your account settings and personalize your eco-journey experience.
          </p>

          {/* Stats Bar */}
          {!loading && profile.name && (
            <motion.div
              className="mt-6 inline-flex flex-wrap items-center justify-center gap-6 px-6 py-3 rounded-2xl bg-white/60 backdrop-blur-sm border border-emerald-100 shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center">
                  <FaCrown className="text-emerald-600 text-sm" />
                </div>
                <div className="text-left">
                  <p className="text-lg font-bold text-slate-800">Eco Warrior</p>
                  <p className="text-xs text-slate-500">Current Level</p>
                </div>
              </div>
              <div className="h-8 w-px bg-slate-200" />
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-teal-100 flex items-center justify-center">
                  <FaCalendarAlt className="text-teal-600 text-sm" />
                </div>
                <div className="text-left">
                  <p className="text-lg font-bold text-slate-800">Active</p>
                  <p className="text-xs text-slate-500">Member Status</p>
                </div>
              </div>
              <div className="h-8 w-px bg-slate-200 hidden sm:block" />
              <div className="flex items-center gap-2 hidden sm:flex">
                <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center">
                  <FaShieldAlt className="text-amber-600 text-sm" />
                </div>
                <div className="text-left">
                  <p className="text-lg font-bold text-slate-800">Verified</p>
                  <p className="text-xs text-slate-500">Account</p>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Profile Card Container */}
        <motion.div
          className="rounded-3xl bg-white/80 backdrop-blur-sm shadow-xl shadow-emerald-100/30 border border-emerald-100 p-6 md:p-8"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {/* Section Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-md">
                <FaEdit className="text-white text-lg" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-800">Account Settings</h2>
                <p className="text-sm text-slate-500">Update your personal information</p>
              </div>
            </div>
            {isEditing && (
              <motion.span
                className="px-3 py-1.5 rounded-full bg-amber-100 text-amber-700 text-sm font-medium flex items-center gap-1.5"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                Unsaved Changes
              </motion.span>
            )}
          </div>

          {/* Loading State */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-16">
              <motion.div
                className="w-16 h-16 rounded-full border-4 border-emerald-200 border-t-emerald-600"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
              <p className="mt-4 text-slate-500">Loading your profile...</p>
            </div>
          ) : (
            /* Profile Form */
            <motion.div
              className="space-y-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {/* Profile Avatar Section */}
              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row items-center gap-6 p-6 rounded-2xl bg-gradient-to-br from-emerald-50/80 to-teal-50/80 border border-emerald-100"
              >
                <div className="relative">
                  <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-200/50">
                    <span className="text-4xl font-bold text-white">
                      {profile.name?.charAt(0)?.toUpperCase() || "U"}
                    </span>
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-emerald-500 border-4 border-white flex items-center justify-center">
                    <FaCheckCircle className="text-white text-xs" />
                  </div>
                </div>
                <div className="text-center sm:text-left">
                  <h3 className="text-xl font-bold text-slate-800">{profile.name || "User"}</h3>
                  <p className="text-slate-500 text-sm">{profile.email}</p>
                  <div className="mt-2 flex flex-wrap gap-2 justify-center sm:justify-start">
                    <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-medium">
                      🌱 Eco Enthusiast
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-teal-100 text-teal-700 text-xs font-medium">
                      🌍 Planet Protector
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Form Fields */}
              <div className="grid gap-5">
                {/* Name Input */}
                <motion.div variants={itemVariants} className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-700 ml-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <FaUser className="text-slate-400" />
                    </div>
                    <input
                      type="text"
                      name="name"
                      value={profile.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-slate-200 bg-white/80 backdrop-blur-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all duration-200 shadow-sm hover:shadow-md"
                    />
                  </div>
                </motion.div>

                {/* Email Input */}
                <motion.div variants={itemVariants} className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-700 ml-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <FaEnvelope className="text-slate-400" />
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={profile.email}
                      onChange={handleChange}
                      placeholder="Enter your email address"
                      className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-slate-200 bg-white/80 backdrop-blur-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all duration-200 shadow-sm hover:shadow-md"
                    />
                  </div>
                </motion.div>

                {/* Password Input */}
                <motion.div variants={itemVariants} className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-700 ml-1">
                    New Password
                    <span className="text-slate-400 font-normal ml-1">(optional)</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <FaLock className="text-slate-400" />
                    </div>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        if (!isEditing) setIsEditing(true);
                      }}
                      placeholder="Enter new password to change"
                      className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-slate-200 bg-white/80 backdrop-blur-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all duration-200 shadow-sm hover:shadow-md"
                    />
                  </div>
                  <p className="text-xs text-slate-400 ml-1">
                    Leave blank to keep your current password
                  </p>
                </motion.div>

                {/* Save Button */}
                <motion.div variants={itemVariants} className="pt-4">
                  <motion.button
                    onClick={handleUpdate}
                    disabled={saving}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold shadow-lg shadow-emerald-200/50 hover:shadow-xl hover:shadow-emerald-300/50 disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-300"
                    whileHover={{ scale: saving ? 1 : 1.02, y: saving ? 0 : -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {saving ? (
                      <>
                        <motion.div
                          className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                        Saving Changes...
                      </>
                    ) : (
                      <>
                        <FaSave className="text-lg" />
                        Save Changes
                      </>
                    )}
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Security Tips Section */}
        <motion.div
          className="mt-8 p-6 rounded-3xl bg-gradient-to-r from-slate-50 to-slate-100/50 border border-slate-200"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center shadow-lg">
              <FaShieldAlt className="text-white text-xl" />
            </div>
            <div className="text-center md:text-left flex-grow">
              <h3 className="text-lg font-bold text-slate-800 mb-1">Security Tips</h3>
              <p className="text-sm text-slate-600">
                Use a strong password with at least 8 characters, including numbers and special
                characters for better security.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Quick Links – UPDATED BUTTON STYLE */}
        <motion.div
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <button
            onClick={() => navigate("/dashboard")}
            className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white/80 px-6 py-3 text-base font-medium text-slate-700 shadow-sm hover:border-emerald-400 hover:text-emerald-700 hover:bg-emerald-50 transition-all duration-200"
          >
            ← Back to Dashboard
          </button>

          <button
            onClick={() => navigate("/leaderboard")}
            className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white/80 px-6 py-3 text-base font-medium text-slate-700 shadow-sm hover:border-emerald-400 hover:text-emerald-700 hover:bg-emerald-50 transition-all duration-200"
          >
            View Leaderboard →
          </button>
        </motion.div>
      </div>

      {/* ==================== FOOTER (Exactly matching Achievements/Leaderboard) ==================== */}
      <footer className="mt-12 bg-gradient-to-b from-slate-900 to-slate-950 text-white relative overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="footer-pattern" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.3" />
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#footer-pattern)" />
          </svg>
        </div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-teal-500/5 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-6 py-16">
          {/* Top Section */}
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4 pb-12 border-b border-slate-800">
            {/* Brand */}
            <div className="lg:col-span-1 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                  <FaLeaf className="text-white text-xl" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">CarbonTracker</h3>
                  <p className="text-xs text-slate-400">For Atmanirbhar Bharat</p>
                </div>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed">
                Empowering individuals to track their carbon footprint and make sustainable choices
                for a greener India.
              </p>
              {/* Social Links */}
              <div className="flex gap-3 pt-2">
                {[
                  { icon: <FaTwitter />, href: "#", label: "Twitter" },
                  { icon: <FaLinkedin />, href: "#", label: "LinkedIn" },
                  { icon: <FaInstagram />, href: "#", label: "Instagram" },
                  { icon: <FaGithub />, href: "#", label: "GitHub" },
                ].map((social, idx) => (
                  <a
                    key={idx}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-gradient-to-br hover:from-emerald-500 hover:to-teal-600 flex items-center justify-center text-slate-400 hover:text-white transition-all duration-300 hover:-translate-y-1"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-300">
                Quick Links
              </h4>
              <ul className="space-y-3">
                {[
                  { label: "Dashboard", path: "/dashboard" },
                  { label: "Log Activity", path: "/activity" },
                  { label: "Set Goals", path: "/goals" },
                  { label: "Achievements", path: "/achievements" },
                  { label: "Leaderboard", path: "/leaderboard" },
                ].map((link, idx) => (
                  <li key={idx}>
                    <button
                      onClick={() => navigate(link.path)}
                      className="text-sm text-slate-400 hover:text-emerald-400 transition-colors duration-200 hover:translate-x-1 inline-flex items-center gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/50" />
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* About */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-300">About</h4>
              <ul className="space-y-3">
                {[
                  { label: "Our Mission", path: "/about" },
                  { label: "How It Works", path: "/learn-more" },
                  { label: "Privacy Policy", path: "/privacy" },
                  { label: "Terms of Service", path: "/terms" },
                  { label: "FAQ", path: "/faq" },
                ].map((link, idx) => (
                  <li key={idx}>
                    <button
                      onClick={() => navigate(link.path)}
                      className="text-sm text-slate-400 hover:text-emerald-400 transition-colors duration-200 hover:translate-x-1 inline-flex items-center gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/50" />
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-300">
                Contact Us
              </h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <FaEnvelope className="text-emerald-500 text-sm" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wide">Email</p>
                    <a
                      href="mailto:hello@carbontracker.in"
                      className="text-sm text-slate-300 hover:text-emerald-400 transition-colors"
                    >
                      hello@carbontracker.in
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <FaPhone className="text-emerald-500 text-sm" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wide">Phone</p>
                    <a
                      href="tel:+911234567890"
                      className="text-sm text-slate-300 hover:text-emerald-400 transition-colors"
                    >
                      +91 12345 67890
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <FaMapMarkerAlt className="text-emerald-500 text-sm" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wide">Location</p>
                    <p className="text-sm text-slate-300">New Delhi, India</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🇮🇳</span>
              <p className="text-sm text-slate-400">
                Made with <span className="text-red-500">❤️</span> in India for a Sustainable
                Future
              </p>
            </div>
            <p className="text-sm text-slate-500">
              © {new Date().getFullYear()} CarbonTracker. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default ProfilePage;