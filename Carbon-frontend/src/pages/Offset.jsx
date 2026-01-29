import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import {
  FaLeaf,
  FaTree,
  FaSun,
  FaBicycle,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
  FaGithub,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaDownload,
} from "react-icons/fa";

const API_URL = import.meta.env.VITE_API_URL;

function Offset() {
  const navigate = useNavigate();
  const [offsetData, setOffsetData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    const fetchOffsetData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const res = await axios.get(`${API_URL}/api/offset/summary`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOffsetData(res.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load offset data");
      } finally {
        setLoading(false);
      }
    };

    fetchOffsetData();
  }, []);

  const getCurrentMonth = () => {
    return new Date().toLocaleDateString("en-IN", { month: "long", year: "numeric" });
  };

  const handleDownloadReport = async () => {
    try {
      setIsDownloading(true);
      const token = localStorage.getItem("token");
      
      const response = await fetch(`${API_URL}/api/offset/report`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch report");
      }

      // Get blob from response
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      
      // Create temporary link and trigger download
      const link = document.createElement("a");
      link.href = url;
      link.download = `Carbon_Report_${getCurrentMonth().replace(" ", "_")}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Failed to download report:", err);
      alert("Failed to generate report. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  };

  const fieldVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.4, ease: "easeOut" },
    }),
  };
  

  return (
    <div className="min-h-screen relative overflow-hidden text-base md:text-lg">
      {/* ==================== BACKGROUND (Same as Home/Dashboard) ==================== */}
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
      </div>

      {/* ==================== MAIN CONTENT ==================== */}
      <div className="max-w-5xl mx-auto px-6 pt-12 pb-20 relative">
        {/* Page Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg shadow-emerald-200 mb-5"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <FaLeaf className="text-white text-3xl" />
          </motion.div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-800 mb-4">
            Carbon{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">
              Offset
            </span>
          </h1>

          <p className="text-slate-600 text-base md:text-lg max-w-md mx-auto leading-relaxed">
            Balance your carbon footprint by supporting activities that remove CO₂ from the atmosphere.
          </p>
        </motion.div>

        {/* Main Card */}
        <motion.div
          className="rounded-3xl bg-white/80 backdrop-blur-sm shadow-xl shadow-emerald-100/30 border border-emerald-100 p-6 md:p-8"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {/* Loading State */}
          {loading && (
            <div className="text-center py-12">
              <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-slate-600">Loading your offset data...</p>
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚠️</span>
              </div>
              <p className="text-slate-700 font-medium mb-2">Unable to load data</p>
              <p className="text-slate-500 text-sm">{error}</p>
            </div>
          )}

          {/* Content */}
          {!loading && !error && offsetData && (
            <div className="space-y-8">
              {/* Monthly Summary */}
              <div>
                <label className="block text-lg md:text-xl font-bold text-slate-800 mb-4">
                  Your Monthly Emissions — {getCurrentMonth()}
                </label>

                <div className="grid grid-cols-2 gap-4">
                  <motion.div
                    custom={0}
                    variants={fieldVariants}
                    initial="hidden"
                    animate="visible"
                    className="p-5 rounded-2xl bg-emerald-50 border border-emerald-100 text-center"
                  >
                    <p className="text-base text-slate-500 mb-1">Total CO₂ Emitted</p>
                    <p className="text-3xl md:text-4xl font-bold text-emerald-700">
                      {offsetData?.totalCO2?.toFixed(2) || 0}
                      <span className="text-lg font-normal ml-1">kg</span>
                    </p>
                  </motion.div>

                  <motion.div
                    custom={1}
                    variants={fieldVariants}
                    initial="hidden"
                    animate="visible"
                    className="p-5 rounded-2xl bg-blue-50 border border-blue-100 text-center"
                  >
                    <p className="text-base text-slate-500 mb-1">Activities Logged</p>
                    <p className="text-3xl md:text-4xl font-bold text-blue-700">
                      {offsetData?.activitiesCount || 0}
                    </p>
                  </motion.div>
                </div>
              </div>

              {/* Divider */}
              <div className="h-px bg-gradient-to-r from-transparent via-emerald-200 to-transparent" />
            </div>
          )}

          {/* Offset Options */}
          {!loading && !error && offsetData && (
            <div className="mt-8">
              <label className="block text-lg md:text-xl font-bold text-slate-800 mb-6">
                Ways to Offset Your Emissions
              </label>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Tree Plantation */}
                <motion.div
                  custom={2}
                  variants={fieldVariants}
                  initial="hidden"
                  animate="visible"
                  className="p-6 rounded-2xl border-2 border-green-200 bg-green-50/50 flex flex-col items-center text-center h-full cursor-pointer transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-xl hover:shadow-green-200/50 hover:border-green-400 hover:bg-green-50 hover:scale-[1.02]"
                >
                  <div className="w-14 h-14 rounded-xl bg-green-100 text-green-600 flex items-center justify-center text-2xl mb-4 flex-shrink-0">
                    <FaTree />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-800 mb-3">Tree Plantation</h3>
                  <p className="text-3xl font-bold text-green-700 mb-1">
                    {offsetData?.offsetOptions?.monthlyOffset?.treesRequired?.count || 0}
                  </p>
                  <p className="text-base text-slate-500 mb-4">trees/month</p>
                  <p className="text-sm text-slate-500 leading-relaxed mt-auto">
                    Trees absorb CO₂ throughout their lifetime. Planting trees is a long-term investment in our planet&apos;s health.
                  </p>
                </motion.div>

                {/* Renewable Energy */}
                <motion.div
                  custom={3}
                  variants={fieldVariants}
                  initial="hidden"
                  animate="visible"
                  className="p-6 rounded-2xl border-2 border-amber-200 bg-amber-50/50 flex flex-col items-center text-center h-full cursor-pointer transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-xl hover:shadow-amber-200/50 hover:border-amber-400 hover:bg-amber-50 hover:scale-[1.02]"
                >
                  <div className="w-14 h-14 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center text-2xl mb-4 flex-shrink-0">
                    <FaSun />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-800 mb-3">Renewable Energy Support</h3>
                  <p className="text-3xl font-bold text-amber-700 mb-1">
                    ₹{offsetData?.offsetOptions?.monthlyOffset?.renewableEnergyCost?.amount?.toFixed(0) || 0}
                  </p>
                  <p className="text-base text-slate-500 mb-4">approx. contribution</p>
                  <p className="text-sm text-slate-500 leading-relaxed mt-auto">
                    Contribute to renewable energy projects. Actual costs may vary by provider and project type.
                  </p>
                </motion.div>

                {/* Lifestyle Actions */}
                <motion.div
                  custom={4}
                  variants={fieldVariants}
                  initial="hidden"
                  animate="visible"
                  className="p-6 rounded-2xl border-2 border-purple-200 bg-purple-50/50 flex flex-col items-center text-center h-full md:col-span-2 lg:col-span-1 cursor-pointer transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-xl hover:shadow-purple-200/50 hover:border-purple-400 hover:bg-purple-50 hover:scale-[1.02]"
                >
                  <div className="w-14 h-14 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center text-2xl mb-4 flex-shrink-0">
                    <FaBicycle />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-800 mb-3">Lifestyle Actions</h3>
                  <div className="flex flex-wrap justify-center gap-6 mb-1">
                    <div>
                      <p className="text-3xl font-bold text-purple-700">
                        {offsetData?.offsetOptions?.lifestyleActions?.cyclingDays?.count || 0}
                      </p>
                      <p className="text-base text-slate-500">cycling days</p>
                    </div>
                    <div>
                      <p className="text-3xl font-bold text-purple-700">
                        {offsetData?.offsetOptions?.lifestyleActions?.meatFreeDays?.count || 0}
                      </p>
                      <p className="text-base text-slate-500">meat-free days</p>
                    </div>
                  </div>
                  <p className="text-sm text-slate-500 leading-relaxed mt-auto pt-3">
                    Small daily changes add up. These are estimated equivalents to offset your monthly emissions.
                  </p>
                </motion.div>
              </div>
            </div>
          )}

          {/* Yearly Projection - Continue in original container */}
          {!loading && !error && offsetData && offsetData?.offsetOptions?.yearlyOffset && (
            <>
              <div className="h-px bg-gradient-to-r from-transparent via-emerald-200 to-transparent mt-8" />

              <motion.div
                custom={5}
                variants={fieldVariants}
                initial="hidden"
                animate="visible"
                className="mt-8"
              >
                <div className="flex items-center gap-2 mb-4">
                  <label className="text-lg md:text-xl font-bold text-slate-800">
                    Yearly Projection
                  </label>
                  <span className="text-sm bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium">
                    Estimate
                  </span>
                </div>

                <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-50 to-emerald-50 border border-slate-200">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <p className="text-base text-slate-500 mb-1">Projected Yearly CO₂</p>
                      <p className="text-2xl font-bold text-slate-800">
                        {offsetData.offsetOptions.yearlyOffset.projectedCO2?.toFixed(1) || 0}
                        <span className="text-base font-normal ml-1">kg</span>
                      </p>
                    </div>
                    <div>
                      <p className="text-base text-slate-500 mb-1">Trees Needed (Yearly)</p>
                      <p className="text-2xl font-bold text-emerald-700">
                        {offsetData.offsetOptions.yearlyOffset.treesRequired?.count || 0}
                        <span className="text-base font-normal ml-1">trees</span>
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-slate-500 mt-4">
                    * Based on your current monthly emissions extrapolated over 12 months.
                  </p>
                </div>
              </motion.div>
            </>
          )}

          {/* Info Box */}
          <motion.div
            className="mt-8 p-5 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-100"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center flex-shrink-0">
                <span className="text-xl">🌍</span>
              </div>
              <div>
                <p className="text-lg text-slate-700 leading-relaxed">
                  <span className="font-bold text-emerald-700">Remember:</span> Offsetting is valuable, but reducing your emissions at the source is always the best approach. Use these offsets as a complement to sustainable lifestyle choices, not a replacement.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Disclaimer */}
          <motion.p
            className="mt-6 text-sm text-slate-500 text-center leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            ⚠️ All offset values are approximations for educational and awareness purposes only. 
            Actual requirements may vary based on tree species, location, and energy sources.
          </motion.p>

          {/* Download Report Button */}
          <motion.div
            className="mt-8 flex justify-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <button
              onClick={handleDownloadReport}
              disabled={isDownloading}
              className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-emerald-200 hover:shadow-xl hover:shadow-emerald-300 hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-lg"
            >
              {isDownloading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Generating report…
                </>
              ) : (
                <>
                  <FaDownload className="text-xl" />
                  Download Monthly Carbon Report
                </>
              )}
            </button>
          </motion.div>
        </motion.div>

        {/* Quick Links */}
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
}

export default Offset;
