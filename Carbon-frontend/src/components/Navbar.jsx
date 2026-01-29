// src/components/Navbar.jsx
import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import logo from "../assets/Carbon Tracker.png";

function Navbar({ user, setUser }) {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isAtTop, setIsAtTop] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Check if at top of page
      setIsAtTop(currentScrollY < 10);
      
      // Determine scroll direction
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        // Scrolling DOWN & past threshold - HIDE navbar
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        // Scrolling UP - SHOW navbar
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    // Add scroll event listener with passive for better performance
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Cleanup on unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  // Ensure navbar is visible when at top
  useEffect(() => {
    if (window.scrollY < 10) {
      setIsVisible(true);
      setIsAtTop(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  const links = [
    { to: "/", label: "Home" },
    { to: "/dashboard", label: "Dashboard" },
    { to: "/goals", label: "Goals" },
    { to: "/achievements", label: "Achievements" },
    { to: "/leaderboard", label: "Leaderboard" },
    { to: "/profile", label: "Profile" },
  ];

  const actionLinks = [
    { to: "/activity", label: "Log Activity" },
    { to: "/offset", label: "Carbon Offset" },
  ];

  return (
    <>
      {/* Google Fonts Import for Poppins */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
          .font-poppins {
            font-family: 'Poppins', sans-serif;
          }
        `}
      </style>
      
      <nav 
        className={`
          font-poppins
          fixed top-0 left-0 right-0 z-50
          transition-all duration-1000 ease-in-out
          ${isVisible 
            ? 'translate-y-0 opacity-100' 
            : '-translate-y-full opacity-0'
          }
          ${!isAtTop && isVisible 
            ? 'shadow-md shadow-emerald-100/50' 
            : 'shadow-none'
          }
        `}
        onMouseEnter={() => setIsVisible(true)}
      >
        {/* Background with blur effect */}
        <div 
          className={`
            absolute inset-0 
            transition-all duration-300
            ${isAtTop 
              ? 'bg-transparent' 
              : 'bg-gradient-to-r from-white/95 via-emerald-50/90 to-white/95 backdrop-blur-lg'
            }
          `}
        />
        
        {/* Subtle bottom border when scrolled */}
        <div 
          className={`
            absolute bottom-0 left-0 right-0 h-[1px]
            bg-gradient-to-r from-transparent via-emerald-200/50 to-transparent
            transition-opacity duration-300
            ${isAtTop ? 'opacity-0' : 'opacity-100'}
          `}
        />
        
        <div
          className="
            relative
            max-w-7xl mx-auto
            px-8 lg:px-12
            py-6 md:py-7
            flex items-center
          "
        >
          {/* LEFT: Logo area */}
          <div className="w-1/5 flex justify-start">
            <img
              src={logo}
              alt="Carbon Tracker logo"
              onClick={() => navigate("/")}
              className="
                h-[137px] w-[137px] md:h-[117px] md:w-[117px] 
                rounded-full object-contain cursor-pointer 
                transition-transform duration-300 
                hover:scale-105 hover:rotate-3
              "
            />
          </div>

          {/* CENTER: Nav links */}
          <div className="w-3/5 flex justify-center gap-10">
            {links.slice(0, 2).map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `
                  whitespace-nowrap
                  relative text-[15px] font-medium text-slate-700
                  px-1 py-1
                  hover:text-emerald-700 
                  transition-all duration-200

                  after:content-[''] after:absolute after:left-0 after:-bottom-1
                  after:h-[2.5px] after:bg-gradient-to-r after:from-emerald-500 after:to-teal-500 
                  after:w-0 after:rounded-full
                  hover:after:w-full after:transition-all after:duration-300 after:ease-out

                  ${isActive 
                    ? "text-emerald-700 font-semibold after:w-full" 
                    : ""
                  }
                `
                }
              >
                {item.label}
              </NavLink>
            ))}

            {/* Actions Dropdown */}
            <div className="relative group">
              <button
                className="
                  whitespace-nowrap
                  relative text-[15px] font-medium text-slate-700
                  px-1 py-1
                  hover:text-emerald-700 
                  transition-all duration-200
                  flex items-center gap-1

                  after:content-[''] after:absolute after:left-0 after:-bottom-1
                  after:h-[2.5px] after:bg-gradient-to-r after:from-emerald-500 after:to-teal-500 
                  after:w-0 after:rounded-full
                  group-hover:after:w-full after:transition-all after:duration-300 after:ease-out
                "
              >
                Actions
                <svg 
                  className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown Menu */}
              <div 
                className="
                  absolute top-full left-1/2 -translate-x-1/2 pt-3
                  opacity-0 invisible
                  group-hover:opacity-100 group-hover:visible
                  transition-all duration-200
                "
              >
                <div 
                  className="
                    bg-white/95 backdrop-blur-lg
                    rounded-xl shadow-lg shadow-emerald-100/50
                    border border-emerald-100
                    py-2 min-w-[160px]
                    overflow-hidden
                  "
                >
                  {actionLinks.map((item) => (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      className={({ isActive }) =>
                        `
                        block px-4 py-2.5
                        text-[14px] font-medium text-slate-700
                        hover:bg-emerald-50 hover:text-emerald-700
                        transition-all duration-200
                        ${isActive ? "text-emerald-700 bg-emerald-50/50" : ""}
                      `
                      }
                    >
                      {item.label}
                    </NavLink>
                  ))}
                </div>
              </div>
            </div>

            {links.slice(2).map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `
                  whitespace-nowrap
                  relative text-[15px] font-medium text-slate-700
                  px-1 py-1
                  hover:text-emerald-700 
                  transition-all duration-200

                  after:content-[''] after:absolute after:left-0 after:-bottom-1
                  after:h-[2.5px] after:bg-gradient-to-r after:from-emerald-500 after:to-teal-500 
                  after:w-0 after:rounded-full
                  hover:after:w-full after:transition-all after:duration-300 after:ease-out

                  ${isActive 
                    ? "text-emerald-700 font-semibold after:w-full" 
                    : ""
                  }
                `
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>

          {/* RIGHT: Login / Logout button */}
          <div className="w-1/5 flex justify-end">
            {user ? (
              <button
                onClick={handleLogout}
                className="
                  font-semibold
                  rounded-full 
                  bg-gradient-to-r from-emerald-600 to-teal-600
                  text-white text-sm 
                  px-7 py-2.5 
                  hover:from-emerald-700 hover:to-teal-700
                  hover:shadow-lg hover:shadow-emerald-200/50
                  hover:-translate-y-0.5
                  active:translate-y-0
                  transition-all duration-200
                "
              >
                Logout
              </button>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="
                  font-semibold
                  rounded-full 
                  bg-gradient-to-r from-emerald-600 to-teal-600
                  text-white text-sm 
                  px-7 py-2.5 
                  hover:from-emerald-700 hover:to-teal-700
                  hover:shadow-lg hover:shadow-emerald-200/50
                  hover:-translate-y-0.5
                  active:translate-y-0
                  transition-all duration-200
                "
              >
                Login
              </button>
            )}
          </div>
        </div>
      </nav>
      
      {/* Spacer to prevent content from hiding behind fixed navbar */}
      <div className="h-[180px] md:h-[160px]" />
    </>
  );
}

export default Navbar;