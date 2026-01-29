// pages/Goals.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useGoal } from "../components/GoalContext";
import { motion } from "framer-motion";
import {
  FaLeaf,
  FaBullseye,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
  FaGithub,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaCheckCircle,
  FaArrowRight,
  FaArrowLeft,
} from "react-icons/fa";

const Goals = () => {
  const navigate = useNavigate();
  const [goalInput, setGoalInput] = useState("");
  const [loading, setLoading] = useState(false);
  const { goal, setGoal, fetchGoal } = useGoal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!goalInput) return toast.error("Please enter a goal");

    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/goals`,
        { weeklyGoal: parseFloat(goalInput) },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(res.data.message);
      fetchGoal();
      setGoalInput("");
    } catch (err) {
      toast.error("Error setting goal");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGoal();
  }, []);

  // Suggested goals for quick selection
  const suggestedGoals = [
    { value: 50, label: "50 kg", description: "Ambitious" },
    { value: 100, label: "100 kg", description: "Moderate" },
    { value: 150, label: "150 kg", description: "Relaxed" },
    { value: 200, label: "200 kg", description: "Starter" },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden text-base md:text-lg">
      {/* ==================== BACKGROUND (Same as Home/Dashboard/Activity) ==================== */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 via-white to-teal-50/30" />

        {/* Floating Circles */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-200/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/3 right-0 w-96 h-96 bg-teal-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-green-200/15 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-emerald-300/10 rounded-full blur-3xl animate-pulse" />

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
          className="absolute top-1/2 left-8 w-16 h-16 text-emerald-200/20 rotate-90"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z" />
        </svg>
      </div>

      {/* ==================== MAIN CONTENT ==================== */}
      <div className="max-w-2xl mx-auto px-6 pt-12 pb-20 relative">
        {/* Page Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg shadow-emerald-200 mb-5"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <FaBullseye className="text-white text-3xl" />
          </motion.div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-800 mb-4">
            Set Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">
              Weekly Goal
            </span>
          </h1>

          <p className="text-slate-600 text-base md:text-lg max-w-md mx-auto leading-relaxed">
            Define your carbon emission target for the week and track your progress towards a
            sustainable lifestyle.
          </p>
        </motion.div>

        {/* Current Goal Badge */}
        {goal !== null && (
          <motion.div
            className="mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center justify-center">
              <div className="inline-flex items-center gap-4 px-8 py-5 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-md">
                  <FaCheckCircle className="text-white text-xl" />
                </div>
                <div className="text-left">
                  <p className="text-sm text-slate-500 uppercase tracking-wide font-semibold">
                    Current Weekly Goal
                  </p>
                  <p className="text-3xl font-bold text-emerald-700">
                    {goal} <span className="text-lg font-medium text-slate-500">kg CO₂</span>
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Form Card */}
        <motion.div
          className="rounded-3xl bg-white/80 backdrop-blur-sm shadow-xl shadow-emerald-100/30 border border-emerald-100 p-6 md:p-8"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Quick Select Goals */}
            <div>
              <label className="block text-base md:text-lg font-bold text-slate-800 mb-4">
                Quick Select a Goal
              </label>
              <div className="grid grid-cols-4 gap-3">
                {suggestedGoals.map((suggestion) => (
                  <motion.button
                    key={suggestion.value}
                    type="button"
                    onClick={() => setGoalInput(suggestion.value.toString())}
                    className={`relative p-4 rounded-xl border-2 transition-all duration-200 ${
                      goalInput === suggestion.value.toString()
                        ? "border-emerald-500 bg-emerald-50 shadow-md"
                        : "border-slate-200 bg-white hover:border-emerald-300 hover:bg-emerald-50/50"
                    }`}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <p
                      className={`text-xl font-bold ${
                        goalInput === suggestion.value.toString()
                          ? "text-emerald-700"
                          : "text-slate-800"
                      }`}
                    >
                      {suggestion.label}
                    </p>
                    <p
                      className={`text-sm ${
                        goalInput === suggestion.value.toString()
                          ? "text-emerald-600"
                          : "text-slate-500"
                      }`}
                    >
                      {suggestion.description}
                    </p>
                    {goalInput === suggestion.value.toString() && (
                      <motion.div
                        className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                      >
                        <svg
                          className="w-3.5 h-3.5 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </motion.div>
                    )}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-4">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
              <span className="text-base text-slate-400 font-medium">or enter custom goal</span>
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
            </div>

            {/* Custom Input */}
            <div>
              <label className="block text-base md:text-lg font-bold text-slate-800 mb-3">
                Custom Weekly Goal
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={goalInput}
                  onChange={(e) => setGoalInput(e.target.value)}
                  placeholder="Enter your target in kg CO₂"
                  className="w-full border border-slate-300 rounded-xl py-4 px-5 pr-20 text-slate-800 bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 text-lg"
                  required
                />
                <span className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 text-base font-medium">
                  kg CO₂
                </span>
              </div>
              <p className="mt-3 text-sm text-slate-500 leading-relaxed">
                💡 Average Indian weekly carbon footprint is around 150-200 kg CO₂. Set a
                challenging but achievable target!
              </p>
            </div>

            {/* Goal Comparison Info */}
            {goalInput && (
              <motion.div
                className="p-5 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-xl">📊</span>
                  </div>
                  <div>
                    <p className="text-base text-slate-700 leading-relaxed">
                      {parseFloat(goalInput) <= 50 && (
                        <span>
                          <strong className="text-blue-700">Excellent goal!</strong> This is a very
                          ambitious target. You&apos;ll need to make significant lifestyle changes.
                        </span>
                      )}
                      {parseFloat(goalInput) > 50 && parseFloat(goalInput) <= 100 && (
                        <span>
                          <strong className="text-blue-700">Great goal!</strong> This is a
                          challenging but achievable target with consistent effort.
                        </span>
                      )}
                      {parseFloat(goalInput) > 100 && parseFloat(goalInput) <= 150 && (
                        <span>
                          <strong className="text-blue-700">Good start!</strong> This is a moderate
                          goal. Consider lowering it as you build habits.
                        </span>
                      )}
                      {parseFloat(goalInput) > 150 && (
                        <span>
                          <strong className="text-blue-700">Starter goal!</strong> This is a
                          relaxed target. Great for beginners just starting their journey.
                        </span>
                      )}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={loading || !goalInput}
              className={`w-full rounded-full py-4 px-6 font-semibold text-lg transition-all duration-200 ${
                loading || !goalInput
                  ? "bg-slate-300 text-slate-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-200 hover:shadow-xl hover:shadow-emerald-300 hover:-translate-y-0.5"
              }`}
              whileHover={!loading && goalInput ? { scale: 1.02 } : {}}
              whileTap={!loading && goalInput ? { scale: 0.98 } : {}}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Saving Goal...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <FaBullseye className="text-xl" />
                  {goal !== null ? "Update Weekly Goal" : "Set Weekly Goal"}
                </span>
              )}
            </motion.button>
          </form>

          {/* Info Box */}
          <motion.div
            className="mt-8 p-5 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-100"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center flex-shrink-0">
                <span className="text-xl">🌱</span>
              </div>
              <div>
                <p className="text-base text-slate-700 leading-relaxed">
                  <span className="font-bold text-emerald-700">Why set a goal?</span> Setting a
                  weekly carbon goal helps you stay accountable and motivated. Track your progress
                  on the Dashboard and earn achievements as you reduce your footprint!
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Quick Links – UPDATED BUTTON STYLE */}
        <motion.div
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <button
            onClick={() => navigate("/dashboard")}
            className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white/80 px-6 py-3 text-base font-medium text-slate-700 shadow-sm hover:border-emerald-400 hover:text-emerald-700 hover:bg-emerald-50 transition-all duration-200"
          >
            ← Back to Dashboard
          </button>

          <button
            onClick={() => navigate("/activity")}
            className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white/80 px-6 py-3 text-base font-medium text-slate-700 shadow-sm hover:border-emerald-400 hover:text-emerald-700 hover:bg-emerald-50 transition-all duration-200"
          >
            Log Activity →
          </button>
        </motion.div>

        {/* Tips Section */}
        <motion.div
          className="mt-14 grid md:grid-cols-3 gap-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          {[
            {
              emoji: "🚗",
              title: "Transport",
              tip: "Use public transport 2x per week to cut 30% of travel emissions",
            },
            {
              emoji: "💡",
              title: "Electricity",
              tip: "Switch to LED bulbs and save up to 20 kg CO₂ monthly",
            },
            {
              emoji: "🥗",
              title: "Diet",
              tip: "One meat-free day per week reduces your carbon footprint by 10%",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              className="p-5 rounded-2xl bg-white/60 backdrop-blur-sm border border-slate-100 hover:shadow-md transition-shadow"
              whileHover={{ y: -4 }}
            >
              <span className="text-3xl mb-3 block">{item.emoji}</span>
              <h4 className="font-bold text-lg text-slate-800 mb-2">{item.title}</h4>
              <p className="text-sm text-slate-600 leading-relaxed">{item.tip}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* ==================== FOOTER ==================== */}
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
                Empowering individuals to track their carbon footprint and make sustainable
                choices for a greener India.
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
};

export default Goals;