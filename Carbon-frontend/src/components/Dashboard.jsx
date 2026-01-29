import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid,
  ResponsiveContainer, Area, AreaChart
} from 'recharts';
import { useGoal } from "./GoalContext";
import {
  FaLeaf,
  FaChartLine,
  FaLightbulb,
  FaHistory,
  FaBullseye,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
  FaGithub,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaCheckCircle,
  FaExclamationCircle,
} from "react-icons/fa";
import { motion } from "framer-motion";

const API_URL = import.meta.env.VITE_API_URL;

function Dashboard() {
  const navigate = useNavigate();
  const [activities, setActivities] = useState([]);
  const [weeklySummary, setWeeklySummary] = useState(null);
  const [tips, setTips] = useState([]);
  const { goal } = useGoal();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const token = localStorage.getItem("token");

        const [activitiesRes, summaryRes] = await Promise.all([
          axios.get(`${API_URL}/api/activities/my`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${API_URL}/api/activities/weekly-summary`, {
            headers: { Authorization: `Bearer ${token}` },
          })
        ]);

        const fetchedActivities = activitiesRes.data;
        setActivities(fetchedActivities);
        setWeeklySummary({
          ...summaryRes.data,
          goal: goal ?? summaryRes.data.goal,
        });

        // Calculate total emissions per activity type
        const emissionsByActivityType = fetchedActivities.reduce((acc, act) => {
          acc[act.type] = (acc[act.type] || 0) + act.carbonFootprint;
          return acc;
        }, {});

        // Sort activity types by total emissions in descending order
        const sortedActivityTypes = Object.entries(emissionsByActivityType)
          .sort((a, b) => b[1] - a[1])
          .map(([type]) => type);

        // Map activity types to tip categories
        const categoryMap = {
          transport: "transport",
          energy: "electricity",
          food: "diet"
        };

        // Fetch tips based on activity types or fallback to general tips
        if (sortedActivityTypes.length > 0) {
          // Determine how many tips to fetch per category based on activity count
          // Total: 4 tips - 2 from highest, 1 from second, 1 from third
          let tipCountPerCategory;
          if (sortedActivityTypes.length === 1) {
            // 1 activity type: 4 tips from that category
            tipCountPerCategory = [4];
          } else if (sortedActivityTypes.length === 2) {
            // 2 activity types: 2 from highest, 2 from second
            tipCountPerCategory = [2, 2];
          } else {
            // 3+ activity types: 2 from highest, 1 from second, 1 from third
            tipCountPerCategory = [2, 1, 1];
          }

          // Fetch tips for each category (up to 3 categories max)
          const categoriesToFetch = sortedActivityTypes.slice(0, tipCountPerCategory.length);
          const tipPromises = categoriesToFetch.map((activityType) => {
            const category = categoryMap[activityType] || activityType;
            return axios.get(`${API_URL}/api/tips?category=${category}`, {
              headers: { Authorization: `Bearer ${token}` },
            }).then(res => res.data).catch(() => []);
          });

          const tipsResults = await Promise.all(tipPromises);

          // Slice tips according to the distribution and flatten into ordered array
          const orderedTips = tipsResults.flatMap((tipArray, index) => 
            tipArray.slice(0, tipCountPerCategory[index])
          );

          setTips(orderedTips);
        } else {
          // Fallback: no activities, fetch general tips
          const generalTipsRes = await axios.get(`${API_URL}/api/tips`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setTips(generalTipsRes.data);
        }
      } catch (err) {
        console.error("Failed to load dashboard data", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [goal]);

  const emissionsByType = activities.reduce((acc, act) => {
    acc[act.type] = (acc[act.type] || 0) + act.carbonFootprint;
    return acc;
  }, {});

  const chartDataByType = Object.keys(emissionsByType).map(type => ({
    type: type.charAt(0).toUpperCase() + type.slice(1),
    carbon: parseFloat(emissionsByType[type].toFixed(2))
  }));

  const chartDataByDate = activities.map(act => ({
    date: new Date(act.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }),
    carbon: parseFloat(act.carbonFootprint.toFixed(2))
  })).reverse();

  // Custom tooltip for charts
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-800 text-white px-4 py-2 rounded-lg shadow-lg border border-slate-700">
          <p className="text-sm font-medium">{label}</p>
          <p className="text-blue-400 font-bold">{payload[0].value} kg CO₂</p>
        </div>
      );
    }
    return null;
  };

  // Custom tooltip for area chart (green)
  const CustomTooltipGreen = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-800 text-white px-4 py-2 rounded-lg shadow-lg border border-slate-700">
          <p className="text-sm font-medium">{label}</p>
          <p className="text-emerald-400 font-bold">{payload[0].value} kg CO₂</p>
        </div>
      );
    }
    return null;
  };

  // Calculate percentage for progress
  const progressPercentage = weeklySummary 
    ? Math.min((weeklySummary.total / weeklySummary.goal) * 100, 100) 
    : 0;

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* ==================== BACKGROUND (Same as Home Page) ==================== */}
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
        <svg className="absolute top-40 right-20 w-24 h-24 text-emerald-200/30 rotate-12" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z"/>
        </svg>
        <svg className="absolute bottom-60 left-16 w-20 h-20 text-teal-200/25 -rotate-45" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z"/>
        </svg>
      </div>

      {/* ==================== MAIN CONTENT ==================== */}
      <div className="max-w-7xl mx-auto px-6 pb-12 space-y-8 md:space-y-10 relative">
        
        {/* ==================== SIMPLIFIED WELCOME HEADER ==================== */}
        <motion.section
          className="relative rounded-3xl overflow-hidden mt-8"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Simple Clean Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-600" />

          <div className="relative px-8 py-10 md:px-10 md:py-12">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              {/* Left Content */}
              <div className="space-y-3">
                <span className="inline-flex items-center gap-2 text-emerald-100 text-sm font-medium uppercase tracking-wider">
                  <FaChartLine className="text-base" />
                  Your Dashboard
                </span>
                
                <h1 className="text-3xl md:text-4xl font-bold text-white">
                  Welcome back! 👋
                </h1>
                
                <p className="text-emerald-100 text-base md:text-lg max-w-lg">
                  Track, Reduce, Achieve — One Sustainable Step at a Time!
                </p>
              </div>
              
              {/* Right Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => navigate("/activity")}
                  className="px-6 py-2.5 rounded-full bg-white text-emerald-700 font-semibold text-sm hover:bg-emerald-50 hover:-translate-y-0.5 transition-all duration-200 shadow-lg"
                >
                  Log Activity
                </button>
                <button
                  onClick={() => navigate("/goals")}
                  className="px-6 py-2.5 rounded-full border-2 border-white/60 text-white font-semibold text-sm hover:bg-white/10 hover:-translate-y-0.5 transition-all duration-200"
                >
                  Set Goals
                </button>
              </div>
            </div>
          </div>
        </motion.section>

        {/* ==================== WEEKLY GOAL SUMMARY ==================== */}
        {weeklySummary && (
          <motion.section
            className="rounded-3xl bg-white/80 backdrop-blur-sm shadow-xl shadow-emerald-100/30 border border-emerald-100 p-6 md:p-8"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-200">
                <FaBullseye className="text-white text-xl" />
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-slate-800">Weekly Goal Summary</h3>
                <p className="text-slate-500 text-sm">Your carbon emission progress this week</p>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {/* Current Emissions */}
              <div className="rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100 p-5">
                <p className="text-sm text-slate-500 mb-1">Current Emissions</p>
                <p className="text-3xl font-bold text-emerald-700">{weeklySummary.total} kg</p>
                <p className="text-xs text-slate-400 mt-1">CO₂ this week</p>
              </div>
              
              {/* Weekly Goal */}
              <div className="rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 p-5">
                <p className="text-sm text-slate-500 mb-1">Weekly Goal</p>
                <p className="text-3xl font-bold text-blue-700">{weeklySummary.goal} kg</p>
                <p className="text-xs text-slate-400 mt-1">Target limit</p>
              </div>
              
              {/* Status */}
              <div className={`rounded-2xl p-5 ${
                weeklySummary.status === "under" 
                  ? "bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100" 
                  : "bg-gradient-to-br from-red-50 to-orange-50 border border-red-100"
              }`}>
                <p className="text-sm text-slate-500 mb-1">Status</p>
                <div className="flex items-center gap-2">
                  {weeklySummary.status === "under" ? (
                    <>
                      <FaCheckCircle className="text-green-600 text-2xl" />
                      <p className="text-2xl font-bold text-green-700">On Track!</p>
                    </>
                  ) : (
                    <>
                      <FaExclamationCircle className="text-red-600 text-2xl" />
                      <p className="text-2xl font-bold text-red-700">Over Goal</p>
                    </>
                  )}
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  {weeklySummary.status === "under" 
                    ? `${(weeklySummary.goal - weeklySummary.total).toFixed(1)} kg remaining`
                    : `${(weeklySummary.total - weeklySummary.goal).toFixed(1)} kg over limit`
                  }
                </p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Progress</span>
                <span className={`font-semibold ${progressPercentage > 100 ? 'text-red-600' : 'text-emerald-600'}`}>
                  {progressPercentage.toFixed(1)}%
                </span>
              </div>
              <div className="w-full h-4 bg-slate-100 rounded-full overflow-hidden">
                <motion.div
                  className={`h-full rounded-full ${
                    progressPercentage > 100 
                      ? 'bg-gradient-to-r from-red-500 to-orange-500' 
                      : progressPercentage > 75 
                        ? 'bg-gradient-to-r from-amber-500 to-yellow-500'
                        : 'bg-gradient-to-r from-emerald-500 to-teal-500'
                  }`}
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(progressPercentage, 100)}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              </div>
            </div>
          </motion.section>
        )}

        {/* ==================== CHARTS SECTION (STACKED) ==================== */}
        <div className="space-y-8">
          {/* Bar Chart - Emissions by Activity (BLUE GRADIENT) */}
          <motion.section
            className="rounded-3xl bg-white/80 backdrop-blur-sm shadow-xl shadow-emerald-100/30 border border-emerald-100 p-6 md:p-8"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-200">
                <FaChartLine className="text-white text-xl" />
              </div>
              <div>
                <h4 className="text-xl md:text-2xl font-bold text-slate-800">CO₂ Emissions by Activity</h4>
                <p className="text-slate-500 text-sm">Breakdown of your carbon footprint by category</p>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-slate-50 to-white rounded-2xl p-4 border border-slate-100">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartDataByType} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                  <defs>
                    {/* BLUE GRADIENT for Bar Chart */}
                    <linearGradient id="barGradientBlue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#3b82f6" stopOpacity={1}/>
                      <stop offset="100%" stopColor="#6366f1" stopOpacity={0.85}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis 
                    dataKey="type" 
                    tick={{ fill: '#64748b', fontSize: 12 }}
                    axisLine={{ stroke: '#cbd5e1' }}
                  />
                  <YAxis 
                    tick={{ fill: '#64748b', fontSize: 12 }}
                    axisLine={{ stroke: '#cbd5e1' }}
                    label={{ value: 'kg CO₂', angle: -90, position: 'insideLeft', fill: '#64748b' }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar 
                    dataKey="carbon" 
                    fill="url(#barGradientBlue)" 
                    radius={[8, 8, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.section>

          {/* Area Chart - Trend Over Time (GREEN - unchanged) */}
          <motion.section
            className="rounded-3xl bg-white/80 backdrop-blur-sm shadow-xl shadow-emerald-100/30 border border-emerald-100 p-6 md:p-8"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-200">
                <FaChartLine className="text-white text-xl" />
              </div>
              <div>
                <h4 className="text-xl md:text-2xl font-bold text-slate-800">CO₂ Trend Over Time</h4>
                <p className="text-slate-500 text-sm">Track your emissions journey</p>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-slate-50 to-white rounded-2xl p-4 border border-slate-100">
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={chartDataByDate} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                  <defs>
                    <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10b981" stopOpacity={0.4}/>
                      <stop offset="100%" stopColor="#10b981" stopOpacity={0.05}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis 
                    dataKey="date" 
                    tick={{ fill: '#64748b', fontSize: 12 }}
                    axisLine={{ stroke: '#cbd5e1' }}
                  />
                  <YAxis 
                    tick={{ fill: '#64748b', fontSize: 12 }}
                    axisLine={{ stroke: '#cbd5e1' }}
                    label={{ value: 'kg CO₂', angle: -90, position: 'insideLeft', fill: '#64748b' }}
                  />
                  <Tooltip content={<CustomTooltipGreen />} />
                  <Area 
                    type="monotone" 
                    dataKey="carbon" 
                    stroke="#10b981" 
                    strokeWidth={3}
                    fill="url(#areaGradient)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.section>
        </div>

        {/* ==================== ACTIVITIES & TIPS SECTION ==================== */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {/* Recent Activities */}
          <motion.section
            className="rounded-3xl bg-white/80 backdrop-blur-sm shadow-xl shadow-emerald-100/30 border border-emerald-100 p-6 md:p-8"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center shadow-lg shadow-purple-200">
                <FaHistory className="text-white text-xl" />
              </div>
              <div>
                <h4 className="text-xl md:text-2xl font-bold text-slate-800">Recent Activities</h4>
                <p className="text-slate-500 text-sm">Your latest logged activities</p>
              </div>
            </div>
            
            <div className="space-y-4">
              {activities.length === 0 ? (
                <div className="text-center py-8">
                  <FaLeaf className="text-4xl text-slate-300 mx-auto mb-3" />
                  <p className="text-slate-500">No activities logged yet</p>
                  <button
                    onClick={() => navigate("/activity")}
                    className="mt-3 text-emerald-600 font-medium hover:text-emerald-700"
                  >
                    Log your first activity →
                  </button>
                </div>
              ) : (
                activities.slice(0, 4).map((act, index) => (
                  <motion.div 
                    key={index} 
                    className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-slate-50 to-white border border-slate-100 hover:shadow-md transition-shadow"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      act.type === 'transport' ? 'bg-blue-100 text-blue-600' :
                      act.type === 'energy' ? 'bg-amber-100 text-amber-600' :
                      act.type === 'food' ? 'bg-green-100 text-green-600' :
                      'bg-purple-100 text-purple-600'
                    }`}>
                      {act.type === 'transport' ? '🚗' :
                       act.type === 'energy' ? '⚡' :
                       act.type === 'food' ? '🍽️' : '📦'}
                    </div>
                    <div className="flex-grow">
                      <p className="font-semibold text-slate-800">
                        {act.type.charAt(0).toUpperCase() + act.type.slice(1)}
                      </p>
                      <p className="text-sm text-slate-500">
                        {new Date(act.createdAt).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-slate-800">{act.carbonFootprint.toFixed(2)}</p>
                      <p className="text-xs text-slate-500">kg CO₂</p>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
            
            {activities.length > 4 && (
              <button
                onClick={() => navigate("/activity")}
                className="w-full mt-4 py-3 text-center text-emerald-600 font-medium hover:text-emerald-700 hover:bg-emerald-50 rounded-xl transition-colors"
              >
                View all activities →
              </button>
            )}
          </motion.section>

          {/* Eco-Friendly Tips */}
          <motion.section
            className="rounded-3xl bg-white/80 backdrop-blur-sm shadow-xl shadow-emerald-100/30 border border-emerald-100 p-6 md:p-8"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-200">
                <FaLightbulb className="text-white text-xl" />
              </div>
              <div>
                <h4 className="text-xl md:text-2xl font-bold text-slate-800">Eco-Friendly Tips</h4>
                <p className="text-slate-500 text-sm">Personalized suggestions for you</p>
              </div>
            </div>
            
            <div className="space-y-4">
              {tips.length === 0 ? (
                <div className="text-center py-8">
                  <FaLightbulb className="text-4xl text-slate-300 mx-auto mb-3" />
                  <p className="text-slate-500">Tips will appear based on your activities</p>
                </div>
              ) : (
                <>
                  {tips.slice(0, 4).map((tip, index) => (
                    <motion.div 
                      key={index} 
                      className="p-5 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 border-l-4 border-emerald-500 hover:shadow-md transition-shadow"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-xl">🌿</span>
                        <p className="text-slate-700 text-base leading-relaxed">{tip.message}</p>
                      </div>
                    </motion.div>
                  ))}
                  <div className="pt-4 text-center">
                    <p className="text-sm text-slate-400 italic">💡 Tips are personalized based on your highest carbon-emitting activities</p>
                  </div>
                </>
              )}
            </div>
          </motion.section>
        </div>

        {/* ==================== QUICK STATS ==================== */}
        <motion.section
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {[
            { 
              label: "Total Activities", 
              value: activities.length, 
              icon: "📊", 
              color: "from-blue-500 to-indigo-600",
              bgColor: "bg-blue-50"
            },
            { 
              label: "Total CO₂", 
              value: `${activities.reduce((sum, a) => sum + a.carbonFootprint, 0).toFixed(1)} kg`, 
              icon: "🌍", 
              color: "from-emerald-500 to-teal-600",
              bgColor: "bg-emerald-50"
            },
            { 
              label: "Avg per Activity", 
              value: activities.length > 0 
                ? `${(activities.reduce((sum, a) => sum + a.carbonFootprint, 0) / activities.length).toFixed(2)} kg`
                : "0 kg", 
              icon: "📈", 
              color: "from-amber-500 to-orange-600",
              bgColor: "bg-amber-50"
            },
            { 
              label: "Tips Received", 
              value: tips.length, 
              icon: "💡", 
              color: "from-purple-500 to-violet-600",
              bgColor: "bg-purple-50"
            },
          ].map((stat, index) => (
            <motion.div
              key={index}
              className={`${stat.bgColor} rounded-2xl p-5 border border-slate-100 hover:shadow-lg transition-shadow`}
              whileHover={{ y: -4, scale: 1.02 }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl">{stat.icon}</span>
                <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${stat.color} opacity-20`} />
              </div>
              <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
              <p className="text-sm text-slate-500">{stat.label}</p>
            </motion.div>
          ))}
        </motion.section>

        {/* ==================== CTA SECTION ==================== */}
        <motion.section
          className="relative rounded-[2rem] overflow-hidden shadow-2xl mt-12"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-700" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.08),transparent_40%)]" />
          
          {/* Pattern */}
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <pattern id="dashboard-cta-pattern" width="8" height="8" patternUnits="userSpaceOnUse">
                  <circle cx="4" cy="4" r="1" fill="white"/>
                </pattern>
              </defs>
              <rect width="100" height="100" fill="url(#dashboard-cta-pattern)"/>
            </svg>
          </div>

          <div className="relative p-8 md:p-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <p className="text-sm font-bold uppercase tracking-wider text-emerald-200">
                Take the next step
              </p>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mt-3 text-white">
                You've seen where your emissions come from. The next step is to balance your impact.
              </h2>
              <p className="text-base md:text-lg text-emerald-100 mt-4 leading-relaxed">
                Explore carbon offset options like tree planting, renewable energy adoption, 
                and sustainable lifestyle changes to neutralize your carbon footprint.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => { window.scrollTo(0, 0); navigate("/offset"); }}
                className="rounded-full bg-white px-8 py-3 text-base font-bold text-emerald-700 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-200 whitespace-nowrap"
              >
                Offset Your Carbon Impact
              </button>
            </div>
          </div>
        </motion.section>

      </div>

      {/* ==================== FOOTER ==================== */}
      <footer className="mt-20 bg-gradient-to-b from-slate-900 to-slate-950 text-white relative overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="footer-pattern" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.3"/>
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#footer-pattern)"/>
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
                Empowering individuals to track their carbon footprint and make sustainable choices for a greener India.
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
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-300">
                About
              </h4>
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
                    <a href="mailto:hello@carbontracker.in" className="text-sm text-slate-300 hover:text-emerald-400 transition-colors">
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
                    <a href="tel:+911234567890" className="text-sm text-slate-300 hover:text-emerald-400 transition-colors">
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
                    <p className="text-sm text-slate-300">
                      New Delhi, India
                    </p>
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
                Made with <span className="text-red-500">❤️</span> in India for a Sustainable Future
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

export default Dashboard;