import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import {
  FaLeaf,
  FaTrophy,
  FaUsers,
  FaMedal,
  FaChartLine,
  FaArrowLeft,
  FaArrowRight,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaGithub,
  FaCrown,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";

function Leaderboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/activities/leaderboard`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUsers(res.data);
      } catch (err) {
        console.error("Error loading leaderboard", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const rowVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  // Get rank badge styling
  const getRankBadgeClass = (rank) => {
    switch (rank) {
      case 1:
        return "bg-gradient-to-br from-amber-400 to-yellow-500 shadow-lg shadow-amber-200/50 ring-2 ring-amber-300/50";
      case 2:
        return "bg-gradient-to-br from-slate-300 to-slate-400 shadow-lg shadow-slate-200/50 ring-2 ring-slate-200/50";
      case 3:
        return "bg-gradient-to-br from-orange-400 to-amber-500 shadow-lg shadow-orange-200/50 ring-2 ring-orange-300/50";
      default:
        return "bg-gradient-to-br from-emerald-500 to-teal-600 shadow-md shadow-emerald-200/30";
    }
  };

  // Get rank display content
  const getRankContent = (rank) => {
    if (rank === 1) return <FaCrown className="text-white text-sm" />;
    if (rank === 2) return <FaMedal className="text-white text-sm" />;
    if (rank === 3) return <FaMedal className="text-white text-sm" />;
    return <span className="text-white font-bold text-sm">{rank}</span>;
  };

  // Calculate stats
  const totalParticipants = users.length;
  const topPerformerCO2 = users.length > 0 ? users[0]?.totalCO2 : 0;
  const averageCO2 =
    users.length > 0
      ? users.reduce((acc, u) => acc + (u.totalCO2 || 0), 0) / users.length
      : 0;

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* ==================== BACKGROUND (Same as Achievements page) ==================== */}
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
      <div className="max-w-5xl mx-auto px-6 pt-12 pb-20 relative">
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
            <FaTrophy className="text-white text-3xl" />
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
            Weekly{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500">
              Leaderboard
            </span>
          </h1>

          <p className="text-slate-600 text-base md:text-lg max-w-xl mx-auto">
            See how you rank among other eco-conscious users! Compete for the top spot by reducing
            your carbon footprint.
          </p>

          {/* Stats Bar (matching Achievements style) */}
          {users.length > 0 && (
            <motion.div
              className="mt-6 inline-flex flex-wrap items-center justify-center gap-6 px-6 py-3 rounded-2xl bg-white/60 backdrop-blur-sm border border-emerald-100 shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center">
                  <FaUsers className="text-emerald-600 text-sm" />
                </div>
                <div className="text-left">
                  <p className="text-2xl font-bold text-slate-800">{totalParticipants}</p>
                  <p className="text-xs text-slate-500">Participants</p>
                </div>
              </div>
              <div className="h-8 w-px bg-slate-200" />
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center">
                  <FaCrown className="text-amber-600 text-sm" />
                </div>
                <div className="text-left">
                  <p className="text-2xl font-bold text-slate-800">
                    {topPerformerCO2?.toFixed(1) || 0}
                    <span className="text-sm font-medium text-slate-500 ml-0.5">kg</span>
                  </p>
                  <p className="text-xs text-slate-500">Top Score</p>
                </div>
              </div>
              <div className="h-8 w-px bg-slate-200 hidden sm:block" />
              <div className="flex items-center gap-2 hidden sm:flex">
                <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                  <FaChartLine className="text-blue-600 text-sm" />
                </div>
                <div className="text-left">
                  <p className="text-2xl font-bold text-slate-800">
                    {averageCO2.toFixed(1)}
                    <span className="text-sm font-medium text-slate-500 ml-0.5">kg</span>
                  </p>
                  <p className="text-xs text-slate-500">Average</p>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Leaderboard Card Container */}
        <motion.div
          className="rounded-3xl bg-white/80 backdrop-blur-sm shadow-xl shadow-emerald-100/30 border border-emerald-100 p-6 md:p-8"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {/* Section Header (matching Achievements style) */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-md">
                <FaChartLine className="text-white text-lg" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-800">Rankings</h2>
                <p className="text-sm text-slate-500">Top performers by CO₂ impact</p>
              </div>
            </div>
            {users.length > 0 && (
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200/60">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-sm font-medium text-emerald-700">Live</span>
              </div>
            )}
          </div>

          {/* Loading State (matching Achievements style) */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-16">
              <motion.div
                className="w-16 h-16 rounded-full border-4 border-emerald-200 border-t-emerald-600"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
              <p className="mt-4 text-slate-500">Loading leaderboard...</p>
            </div>
          ) : users.length === 0 ? (
            /* Empty State (matching Achievements style) */
            <motion.div
              className="text-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <motion.div
                className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-dashed border-emerald-200 mb-6"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span className="text-5xl">🌱</span>
              </motion.div>

              <h3 className="text-xl font-bold text-slate-800 mb-2">No Rankings Yet</h3>
              <p className="text-slate-500 max-w-md mx-auto mb-6">
                The leaderboard is waiting for its first eco-warriors! Start logging your
                sustainable activities to appear here and compete with others.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <motion.button
                  onClick={() => navigate("/activity")}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold shadow-lg shadow-emerald-200 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FaLeaf />
                  Log Your First Activity
                </motion.button>
                <motion.button
                  onClick={() => navigate("/goals")}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-emerald-600 text-emerald-700 font-semibold hover:bg-emerald-50 transition-all duration-200"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Set a Goal
                </motion.button>
              </div>

              {/* Tips for climbing the leaderboard */}
              <div className="mt-10 grid md:grid-cols-3 gap-4 max-w-2xl mx-auto">
                {[
                  { emoji: "📝", title: "Log Activities", desc: "Track your daily impact" },
                  { emoji: "🎯", title: "Set Goals", desc: "Challenge yourself weekly" },
                  { emoji: "📉", title: "Reduce CO₂", desc: "Lower your footprint" },
                ].map((tip, index) => (
                  <motion.div
                    key={index}
                    className="p-4 rounded-2xl bg-gradient-to-br from-slate-50 to-white border border-slate-100"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    <span className="text-2xl mb-2 block">{tip.emoji}</span>
                    <h4 className="font-semibold text-slate-800">{tip.title}</h4>
                    <p className="text-xs text-slate-500">{tip.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            /* Table */
            <div className="overflow-x-auto rounded-2xl border border-slate-200/80 shadow-sm">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gradient-to-r from-emerald-600 to-teal-600">
                    <th className="py-4 px-6 text-left font-semibold uppercase tracking-wider text-xs text-white/90">
                      Rank
                    </th>
                    <th className="py-4 px-6 text-left font-semibold uppercase tracking-wider text-xs text-white/90">
                      User
                    </th>
                    <th className="py-4 px-6 text-right font-semibold uppercase tracking-wider text-xs text-white/90">
                      Total CO₂ Saved
                    </th>
                  </tr>
                </thead>
                <motion.tbody
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {users.map((user, idx) => (
                    <motion.tr
                      key={user._id}
                      variants={rowVariants}
                      className={`
                        group cursor-default
                        ${idx % 2 === 0 ? "bg-slate-50/60" : "bg-white"}
                        hover:bg-emerald-50/80 transition-colors duration-200
                        ${idx < 3 ? "relative" : ""}
                      `}
                    >
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-11 h-11 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110 ${getRankBadgeClass(
                              idx + 1
                            )}`}
                          >
                            {getRankContent(idx + 1)}
                          </div>
                          {idx === 0 && (
                            <span className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold text-amber-700 bg-gradient-to-r from-amber-100 to-yellow-100 px-3 py-1.5 rounded-full border border-amber-200/60">
                              <HiSparkles className="text-amber-500" />
                              Champion
                            </span>
                          )}
                          {idx === 1 && (
                            <span className="hidden sm:inline-flex text-xs font-semibold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200/60">
                              Runner-up
                            </span>
                          )}
                          {idx === 2 && (
                            <span className="hidden sm:inline-flex text-xs font-semibold text-orange-700 bg-orange-100 px-3 py-1.5 rounded-full border border-orange-200/60">
                              Third Place
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-4">
                          <div
                            className={`w-11 h-11 rounded-full flex items-center justify-center font-bold text-sm transition-transform duration-300 group-hover:scale-110 ${
                              idx === 0
                                ? "bg-gradient-to-br from-amber-100 to-yellow-100 text-amber-700 border-2 border-amber-200"
                                : idx === 1
                                ? "bg-gradient-to-br from-slate-100 to-slate-200 text-slate-700 border-2 border-slate-200"
                                : idx === 2
                                ? "bg-gradient-to-br from-orange-100 to-amber-100 text-orange-700 border-2 border-orange-200"
                                : "bg-gradient-to-br from-emerald-100 to-teal-100 text-emerald-700 border-2 border-emerald-200"
                            }`}
                          >
                            {user.name?.charAt(0)?.toUpperCase() || "U"}
                          </div>
                          <div>
                            <p className="font-semibold text-slate-800 group-hover:text-emerald-700 transition-colors">
                              {user.name || "Anonymous User"}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <span
                          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-sm transition-all duration-300 group-hover:scale-105 ${
                            idx === 0
                              ? "bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-700 border border-amber-200/60"
                              : idx === 1
                              ? "bg-gradient-to-r from-slate-100 to-slate-150 text-slate-700 border border-slate-200/60"
                              : idx === 2
                              ? "bg-gradient-to-r from-orange-100 to-amber-100 text-orange-700 border border-orange-200/60"
                              : "bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 border border-emerald-200/60"
                          }`}
                        >
                          <FaLeaf className="text-xs opacity-70" />
                          {user.totalCO2?.toFixed(2) || "0.00"} kg
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                </motion.tbody>
              </table>
            </div>
          )}
        </motion.div>

        {/* Motivation Section (matching Achievements style) */}
        {users.length > 0 && (
          <motion.div
            className="mt-8 p-6 rounded-3xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div className="flex flex-col md:flex-row items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg">
                <span className="text-3xl">🏆</span>
              </div>
              <div className="text-center md:text-left flex-grow">
                <h3 className="text-lg font-bold text-slate-800 mb-1">Climb the Ranks!</h3>
                <p className="text-sm text-slate-600">
                  Keep logging your eco-friendly activities to improve your ranking. Every action
                  counts towards a greener planet!
                </p>
              </div>
              <motion.button
                onClick={() => navigate("/activity")}
                className="flex-shrink-0 px-5 py-2.5 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Log More Activities
              </motion.button>
            </div>
          </motion.div>
        )}

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
            onClick={() => navigate("/achievements")}
            className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white/80 px-6 py-3 text-base font-medium text-slate-700 shadow-sm hover:border-emerald-400 hover:text-emerald-700 hover:bg-emerald-50 transition-all duration-200"
          >
            View Achievements →
          </button>
        </motion.div>
      </div>

      {/* ==================== FOOTER (Exactly matching Achievements) ==================== */}
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

export default Leaderboard;