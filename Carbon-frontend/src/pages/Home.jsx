import { useNavigate } from "react-router-dom";
import earthImage from "../assets/earth_image.png";
import childMaskImage from "../assets/child_mask.jpg";
// Import portraits for the change-makers (add these images to your assets folder)
import chetanMainiImg from "../assets/chetan maini.avif";
import vibhaDhawanImg from "../assets/vibha dhawan.jpg";
import sunitaNarainImg from "../assets/sunita narain.webp";
import {
  FaChartLine,
  FaPlus,
  FaBullseye,
  FaTrophy,
  FaUser,
  FaListOl,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
  FaGithub,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaExternalLinkAlt,
  FaLeaf,
  FaCar,
  FaSolarPanel,
  FaGlobeAmericas,
} from "react-icons/fa";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

function Home() {
  const navigate = useNavigate();

  const quickActions = [
    {
      label: "Dashboard",
      icon: <FaChartLine className="text-emerald-700 text-2xl" />,
      color: "bg-emerald-50",
      path: "/dashboard",
    },
    {
      label: "Log Activity",
      icon: <FaPlus className="text-blue-600 text-2xl" />,
      color: "bg-blue-50",
      path: "/activity",
    },
    {
      label: "Goals",
      icon: <FaBullseye className="text-purple-600 text-2xl" />,
      color: "bg-purple-50",
      path: "/goals",
    },
    {
      label: "Achievements",
      icon: <FaTrophy className="text-amber-500 text-2xl" />,
      color: "bg-amber-50",
      path: "/achievements",
    },
    {
      label: "Leaderboard",
      icon: <FaListOl className="text-rose-500 text-2xl" />,
      color: "bg-rose-50",
      path: "/leaderboard",
    },
    {
      label: "Profile",
      icon: <FaUser className="text-slate-600 text-2xl" />,
      color: "bg-slate-50",
      path: "/profile",
    },
  ];

  const facts = [
    "Switching to LED bulbs can reduce your home electricity use and CO₂ emissions.",
    "Using public transport even twice a week can cut a big part of your travel emissions.",
    "Unplugging devices on standby can save 5–10% of your household electricity.",
    "Drying clothes in sunlight instead of a dryer saves energy and money.",
    "Cooking with a pressure cooker uses less LPG and emits fewer greenhouse gases.",
    "Carpooling with friends or colleagues reduces fuel usage and traffic on roads.",
    "Carrying a reusable water bottle avoids single-use plastic and its carbon cost.",
    "Planting and caring for trees helps absorb CO₂ and keeps your area cooler.",
    "Buying local and seasonal fruits and vegetables reduces transport emissions.",
    "Walking or cycling short distances is good for your health and the planet.",
    "Switching off lights and fans when leaving a room saves a lot over a year.",
    "Using energy-efficient appliances can lower both your bill and your footprint.",
    "Taking the stairs instead of lifts saves electricity and keeps you active.",
    "Repairing and reusing items reduces waste and saves the energy of making new ones.",
    "Collecting wet waste separately can help create compost instead of landfill gas.",
  ];

  // Atmanirbhar Bharat - Real Change-Makers Cards Data
  const atmanirbharCards = [
    {
      title: "Chetan Maini – EV Pioneer",
      subtitle: "INDIA'S EV INNOVATOR",
      description:
        "Chetan Maini created India's first electric car, REVA, kickstarting the country's clean mobility movement. His work shows how indigenous innovation can cut fuel use and reduce carbon emissions on Indian roads.",
      icon: <FaCar className="text-3xl text-teal-600" />,
      image: chetanMainiImg,
      gradient: "from-teal-500 to-orange-500",
      bgPattern: "bg-teal-50",
      iconBg: "bg-blue-100",
      iconEmoji: "🚗",
      stats: [
        { label: "Indian Electric Car", value: "1st" },
        { label: "Clean Mobility Work", value: "20+ yrs" },
        { label: "Lower Emissions", value: "EV Push" },
      ],
      link: "https://www.mahindraelectric.com/about-us/heritage/",
    },
    {
      title: "Dr. Vibha Dhawan – TERI DG",
      subtitle: "RENEWABLE ENERGY RESEARCH",
      description:
        "As the head of TERI, Dr. Vibha Dhawan leads research in solar, biomass, and other clean technologies. Her work helps India move towards a low-carbon, self-reliant energy future.",
      icon: <FaSolarPanel className="text-3xl text-teal-600" />,
      image: vibhaDhawanImg,
     gradient: "from-teal-500 to-orange-500",
      bgPattern: "bg-teal-50",
      iconBg: "bg-emerald-100",
      iconEmoji: "☀️",
      stats: [
        { label: "Clean Energy Projects", value: "500+" },
        { label: "Research Publications", value: "1000+" },
        { label: "Sustainability Impact", value: "40+ yrs" },
      ],
      link: "https://www.teriin.org/",
    },
    {
      title: "Sunita Narain – Voice of India",
      subtitle: "CLIMATE & SUSTAINABILITY LEADER",
      description:
        "Sunita Narain has spent decades pushing for clean air, climate justice, and sustainable development in India. Her advocacy supports policies that cut pollution and encourage renewable energy adoption.",
      icon: <FaGlobeAmericas className="text-3xl text-teal-600" />,
      image: sunitaNarainImg,
      gradient: "from-teal-500 to-orange-500",
      bgPattern: "bg-teal-50",
      iconBg: "bg-teal-100",
      iconEmoji: "🌍",
      stats: [
        { label: "Climate Advocacy", value: "30+ yrs" },
        { label: "Policy Interventions", value: "200+" },
        { label: "Climate Recognition", value: "Global" },
      ],
      link: "https://www.cseindia.org/",
    },
  ];

  const [factIndex, setFactIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setFactIndex((prev) => (prev + 1) % facts.length);
    }, 6000);
    return () => clearInterval(id);
  }, [facts.length]);

  const currentFact = facts[factIndex];

  // Floating animation for Earth image
  const floatingAnimation = {
    y: [0, -12, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut",
    },
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Decorations */}
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

      <div className="max-w-7xl mx-auto px-6 pb-12 space-y-16 md:space-y-20 lg:space-y-24 relative">
        
        {/* ==================== ENHANCED HERO SECTION ==================== */}
        <motion.section
          className="grid gap-8 lg:gap-12 md:grid-cols-[1.1fr,1.2fr] items-center pt-8"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Illustration (LEFT) with Glow and Floating Animation */}
          <motion.div
            className="h-full flex items-center justify-center order-1 md:order-1"
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            <div className="w-full flex justify-center relative">
              {/* Soft Halo/Glow Behind Earth */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[400px] h-[400px] md:w-[480px] md:h-[480px] rounded-full bg-gradient-to-br from-emerald-300/30 via-teal-200/20 to-green-300/30 blur-3xl" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[300px] h-[300px] md:w-[360px] md:h-[360px] rounded-full bg-gradient-to-tr from-teal-400/20 to-emerald-300/25 blur-2xl animate-pulse" />
              </div>
              
              {/* Earth Image with Floating Animation */}
              <motion.div
                className="max-w-[560px] rounded-3xl bg-gradient-to-br from-emerald-50/80 to-teal-50/80 border border-emerald-100/50 overflow-hidden shadow-2xl shadow-emerald-200/40 relative z-10 backdrop-blur-sm"
                animate={floatingAnimation}
              >
                <img
                  src={earthImage}
                  alt="Environment Illustration"
                  className="w-full h-[500px] object-contain"
                />
              </motion.div>
            </div>
          </motion.div>

          {/* Text side (RIGHT) with Subheadline */}
          <div className="space-y-5 order-2 md:order-2 md:-ml-8">
            <motion.span
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-100 to-teal-100 px-4 py-1.5 text-xs md:text-sm font-semibold text-emerald-800 shadow-sm"
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <span className="text-xl">🇮🇳</span>
              Student Innovation · Swadeshi for Atmanirbhar Bharat
            </motion.span>

            <motion.h1
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight tracking-tight"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              Track your{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">carbon footprint</span> and
              move towards renewable, sustainable choices.
            </motion.h1>

            {/* NEW: Subheadline */}
            <motion.p
              className="text-lg md:text-xl lg:text-2xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-emerald-700 via-teal-600 to-emerald-600 italic"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Small habits. Big impact. A greener India begins with you.
            </motion.p>

            <motion.p
              className="text-sm md:text-base lg:text-lg text-slate-600 max-w-2xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.25 }}
            >
              Monitor your daily activities, understand your environmental
              impact, and get guided suggestions to adopt cleaner, India-focused
              energy choices for a greener tomorrow.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-3 pt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.35 }}
            >
              <button
                onClick={() => navigate("/dashboard")}
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 px-7 py-2.5 text-sm md:text-base font-semibold text-white shadow-lg shadow-emerald-200 hover:shadow-xl hover:shadow-emerald-300 hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
              >
                Start Tracking
              </button>

              <button
                onClick={() => navigate("/learn-more")}
                className="inline-flex items-center justify-center rounded-full border-2 border-emerald-600 px-7 py-2.5 text-sm md:text-base font-semibold text-emerald-700 hover:bg-emerald-50 hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
              >
                Learn More
              </button>
            </motion.div>
          </div>
        </motion.section>

        {/* Did You Know + Snapshot */}
        <motion.section
          className="grid gap-6 md:gap-8 md:grid-cols-[1.1fr,1fr]"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          {/* Did You Know */}
          <div className="rounded-3xl bg-white/80 backdrop-blur-sm shadow-xl shadow-emerald-100/30 border border-emerald-100 p-6 flex flex-col justify-between h-full">
            <div className="space-y-4">
              <h2 className="text-xl md:text-2xl font-bold text-emerald-800 flex items-center gap-3">
                <span className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-amber-500 flex items-center justify-center text-lg shadow-lg shadow-amber-200">💡</span>
                Did You Know?
              </h2>

              <p className="text-sm md:text-base text-slate-500">
                Small, meaningful habits can reduce your yearly carbon footprint.
              </p>

              <motion.div
                key={factIndex}
                className="text-base md:text-lg text-slate-800 bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100 rounded-2xl px-5 py-4 leading-relaxed shadow-inner"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                {currentFact}
              </motion.div>
            </div>
          </div>

          {/* Simple Snapshot Card */}
          <div className="rounded-3xl bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-700 text-emerald-50 shadow-xl shadow-emerald-200 p-6 flex flex-col justify-between h-full relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <defs>
                  <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                    <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5"/>
                  </pattern>
                </defs>
                <rect width="100" height="100" fill="url(#grid)"/>
              </svg>
            </div>
            
            <div className="relative">
              <p className="text-sm md:text-base font-semibold uppercase tracking-wide text-emerald-100">
                Average Monthly Carbon Footprint (India)
              </p>
              <p className="mt-4 text-2xl md:text-5xl font-bold">
                ~450 <span className="text-2xl md:text-3xl">kg CO₂</span>
              </p>
              <p className="text-lg text-emerald-200">/ month</p>
              <p className="mt-3 text-sm text-emerald-100/90">
                Approximate values shown for awareness.
              </p>
            </div>
            <div className="mt-5 flex flex-wrap gap-2 text-sm text-emerald-50 relative">
              <span className="rounded-full bg-white/20 backdrop-blur-sm px-4 py-2 font-medium">
                🚗 Transport: 45%
              </span>
              <span className="rounded-full bg-white/20 backdrop-blur-sm px-4 py-2 font-medium">
                🍽️ Food: 30%
              </span>
              <span className="rounded-full bg-white/20 backdrop-blur-sm px-4 py-2 font-medium">
                ⚡ Electricity: 25%
              </span>
            </div>
          </div>
        </motion.section>

        {/* ✨ Enhanced Inspirational Quote Section */}
        <motion.section
          className="relative rounded-[2rem] overflow-hidden shadow-2xl"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-100 via-teal-50 to-green-100" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(16,185,129,0.1),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(20,184,166,0.15),transparent_50%)]" />
          
          {/* Decorative Elements */}
          <svg className="absolute top-8 left-8 w-16 h-16 text-emerald-300/40" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z"/>
          </svg>
          <svg className="absolute bottom-8 right-8 w-20 h-20 text-teal-300/30 rotate-180" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z"/>
          </svg>

          <div className="relative px-8 py-16 md:px-16 md:py-20 lg:py-24">
            <div className="max-w-5xl mx-auto text-center space-y-8">
              <motion.p 
                className="text-sm md:text-base font-bold tracking-[0.25em] uppercase text-emerald-700"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                A reminder for all of us
              </motion.p>

              <motion.div
                className="space-y-4"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <span className="block text-emerald-500/60 text-6xl md:text-7xl lg:text-8xl font-serif">
                  ❝
                </span>
                
                <p className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight text-slate-800">
                  We are a part of the problem;
                </p>
                
                <p className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
                  <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">
                    let us strive for a solution
                    <span className="absolute bottom-0 left-0 w-full h-2 md:h-3 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full -z-10 transform translate-y-1"></span>
                  </span>
                </p>
                
                <span className="block text-emerald-500/60 text-6xl md:text-7xl lg:text-8xl font-serif">
                  ❞
                </span>
              </motion.div>

              <motion.div 
                className="flex justify-center"
                initial={{ opacity: 0, scaleX: 0 }}
                whileInView={{ opacity: 1, scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
              >
                <div className="h-1.5 w-32 md:w-48 rounded-full bg-gradient-to-r from-emerald-400 via-teal-400 to-green-400" />
              </motion.div>

              <motion.p 
                className="text-base md:text-lg lg:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
              >
                Every mindful action you take today can help shape a greener,
                more sustainable tomorrow for India and the world.
              </motion.p>
            </div>
          </div>
        </motion.section>

        {/* ==================== NEW: WHY THIS MATTERS - EMOTIONAL SECTION ==================== */}
        <motion.section
          className="relative"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
            {/* Image Side */}
            <motion.div
              className="relative flex justify-center"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              {/* Soft glow behind image */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[280px] h-[280px] md:w-[320px] md:h-[320px] rounded-full bg-gradient-to-br from-rose-200/40 via-orange-100/30 to-amber-200/40 blur-3xl" />
              </div>
              
              {/* Image container */}
              <div className="relative z-10 max-w-[380px] md:max-w-[420px]">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-slate-300/50">
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 via-transparent to-transparent z-10 pointer-events-none" />
                  <div className="absolute inset-0 bg-gradient-to-br from-rose-500/5 to-transparent z-10 pointer-events-none" />
                  
                  <img
                    src={childMaskImage}
                    alt="Child wearing oxygen mask - impact of pollution"
                    className="w-full h-auto object-cover"
                  />
                </div>
                
                {/* Decorative frame elements */}
                <div className="absolute -top-3 -left-3 w-16 h-16 border-t-4 border-l-4 border-emerald-400/50 rounded-tl-2xl" />
                <div className="absolute -bottom-3 -right-3 w-16 h-16 border-b-4 border-r-4 border-teal-400/50 rounded-br-2xl" />
              </div>
            </motion.div>

            {/* Content Side */}
            <motion.div
              className="space-y-6 text-center md:text-left"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              {/* Heading */}
              <div className="space-y-3">
                <motion.span
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-rose-100 to-orange-100 px-4 py-1.5 text-xs md:text-sm font-semibold text-rose-700 shadow-sm"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                >
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                  The Human Cost of Pollution
                </motion.span>
                
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight">
                  Why This{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-orange-500 to-amber-500">
                    Matters
                  </span>{" "}
                  for Us
                </h2>
              </div>

              {/* Emotional content */}
              <div className="space-y-4">
                <motion.p
                  className="text-lg md:text-xl text-slate-700 leading-relaxed"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                >
                  Children are the most vulnerable to toxic air — their bodies absorb more and suffer more.
                  Our everyday choices shape the world they will grow up in.
                </motion.p>
              </div>

              {/* Call to action message */}
              <motion.div
                className="pt-4"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 }}
              >
                <div className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 shadow-sm">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-md">
                    <FaLeaf className="text-white text-sm" />
                  </div>
                  <p className="text-sm md:text-base font-medium text-slate-700">
                    <span className="text-emerald-700 font-semibold">Your sustainable choices today</span> protect the next generation tomorrow.
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>

        {/* 🇮🇳 Atmanirbhar Bharat – Real Change-Makers Section */}
        <motion.section
          className="space-y-8"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center space-y-4">
            <motion.span
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-100 via-white to-green-100 px-6 py-2 text-sm md:text-base font-bold text-slate-800 shadow-md border border-orange-200"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              {/* <span className="text-2xl">🇮🇳</span> */}
              Atmanirbhar Bharat
              {/* <span className="text-2xl">🇮🇳</span> */}
            </motion.span>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900">
              Building a{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-emerald-600 to-green-600">
                Self-Reliant India
              </span>
            </h2>
            
            <p className="text-base md:text-lg text-slate-600 max-w-3xl mx-auto">
              Meet the pioneers driving India&apos;s sustainable future through indigenous innovation, renewable energy research, and climate advocacy.
            </p>
          </div>

          <div className="grid gap-6 md:gap-8 lg:grid-cols-3">
            {atmanirbharCards.map((card, idx) => (
              <motion.a
                key={idx}
                href={card.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15 }}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                {/* Card Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                <div className={`absolute inset-0 ${card.bgPattern} group-hover:opacity-0 transition-opacity duration-500`} />
                
                {/* Pattern Overlay */}
                <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity">
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    <defs>
                      <pattern id={`pattern-changemaker-${idx}`} width="20" height="20" patternUnits="userSpaceOnUse">
                        <circle cx="10" cy="10" r="1.5" fill="currentColor"/>
                      </pattern>
                    </defs>
                    <rect width="100" height="100" fill={`url(#pattern-changemaker-${idx})`}/>
                  </svg>
                </div>

                <div className="relative p-6 md:p-8 space-y-5 min-h-[480px] flex flex-col">
                  {/* Portrait Image with Icon Badge */}
                  <div className="flex items-start gap-4">
                    <div className="relative">
                      {/* Portrait Container */}
                      <div className="w-20 h-20 rounded-2xl overflow-hidden shadow-lg border-2 border-white group-hover:scale-110 group-hover:border-white/50 transition-all duration-300">
                        <img 
                          src={card.image} 
                          alt={card.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            // Fallback to icon if image fails to load
                            e.target.style.display = 'none';
                            e.target.parentElement.innerHTML = `<div class="w-full h-full flex items-center justify-center ${card.iconBg}">${card.icon}</div>`;
                          }}
                        />
                      </div>
                      {/* Emoji Badge */}
                      <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-lg bg-white shadow-md flex items-center justify-center text-lg group-hover:scale-110 transition-transform duration-300">
                        {card.iconEmoji}
                      </div>
                    </div>
                    
                    {/* Subtitle next to image */}
                    <div className="flex-1 pt-2">
                      <p className="text-xs md:text-sm font-bold uppercase tracking-wider text-slate-500 group-hover:text-white/80 transition-colors">
                        {card.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-grow space-y-3">
                    <h3 className="text-xl md:text-2xl font-bold text-slate-900 group-hover:text-white transition-colors leading-tight">
                      {card.title}
                    </h3>
                    <p className="text-sm md:text-base text-slate-600 group-hover:text-white/90 leading-relaxed transition-colors">
                      {card.description}
                    </p>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-200 group-hover:border-white/20 transition-colors">
                    {card.stats.map((stat, statIdx) => (
                      <div key={statIdx} className="text-center">
                        <p className="text-lg md:text-xl font-bold text-slate-900 group-hover:text-white transition-colors">
                          {stat.value}
                        </p>
                        <p className="text-xs text-slate-500 group-hover:text-white/70 transition-colors leading-tight">
                          {stat.label}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Link Indicator */}
                  <div className="flex items-center gap-2 text-sm font-semibold text-slate-600 group-hover:text-white transition-colors pt-2">
                    <span>Learn More</span>
                    <FaExternalLinkAlt className="text-xs group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </motion.section>

        {/* Quick Actions */}
        <motion.section
          className="rounded-3xl bg-white/80 backdrop-blur-sm shadow-xl shadow-emerald-100/30 border border-slate-100 p-6 md:p-8"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-slate-900">
                Quick Actions
              </h3>
              <p className="text-sm md:text-base text-slate-500 mt-1">
                Jump straight into tracking, goals, achievements and more.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {quickActions.map((item, index) => (
              <motion.button
                type="button"
                key={index}
                onClick={() => navigate(item.path)}
                className={`group ${item.color} border-2 border-transparent hover:border-emerald-200 rounded-2xl px-4 py-5 flex flex-col items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200`}
                whileHover={{ y: -4, scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-white shadow-md mb-3 group-hover:scale-110 transition-transform duration-200">
                  {item.icon}
                </div>
                <p className="text-sm md:text-base font-semibold text-slate-800 text-center">
                  {item.label}
                </p>
              </motion.button>
            ))}
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section
          className="relative rounded-[2rem] overflow-hidden shadow-2xl"
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
                <pattern id="cta-pattern" width="8" height="8" patternUnits="userSpaceOnUse">
                  <circle cx="4" cy="4" r="1" fill="white"/>
                </pattern>
              </defs>
              <rect width="100" height="100" fill="url(#cta-pattern)"/>
            </svg>
          </div>

          <div className="relative p-8 md:p-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <p className="text-sm font-bold uppercase tracking-wider text-emerald-200">
                Take the first step today
              </p>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mt-3 text-white">
                Every small action counts towards a cleaner, self-reliant India.
              </h2>
              <p className="text-base md:text-lg text-emerald-100 mt-4 leading-relaxed">
                Start logging your activities, set realistic goals, and gradually
                move towards renewable and Swadeshi energy choices. This platform
                helps you see your impact in a simple, visual way.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => navigate("/activity")}
                className="rounded-full bg-white px-8 py-3 text-base font-bold text-emerald-700 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-200"
              >
                Log Your First Activity
              </button>
              <button
                onClick={() => navigate("/goals")}
                className="rounded-full border-2 border-white/50 px-8 py-3 text-base font-bold text-white hover:bg-white/10 hover:-translate-y-1 transition-all duration-200"
              >
                Set a Sustainability Goal
              </button>
            </div>
          </div>
        </motion.section>
      </div>

      {/* Footer */}
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

export default Home;