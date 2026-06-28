import { useState, useEffect } from "react";
import dayjs from "dayjs";
import { navLinks, navIcons } from "#constants/index.js";

const Navbar = ({ openWindow }) => {
  // State to hold the current live time
  const [currentTime, setCurrentTime] = useState(dayjs().format("ddd MMM h:mm A"));

  // Effect to update the time every second automatically
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(dayjs().format("ddd MMM h:mm A"));
    }, 1000);

    // Clean up the interval on component unmount
    return () => clearInterval(timer);
  }, []);

  return (
    <nav className="flex justify-between items-center bg-white/30 backdrop-blur-3xl p-2 px-5 select-none transition-all duration-500 border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.03)]">
      {/* Left Section: Logo & Text Links */}
      <div className="flex items-center gap-6">
        
        {/* Brand Logo Container */}
        <div className="flex items-center gap-3 group cursor-pointer relative">
          {/* Strictly Contained Circular Profile Wrapper */}
          <div className="relative w-9 h-9 rounded-full overflow-hidden border border-white/20 transition-all duration-300 ease-in-out bg-zinc-900 group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(255,255,255,0.7)] group-hover:border-white">
            <img 
              src="/images/Rishabh portfolio.jpeg" 
              alt="Rishabh Portfolio" 
              className="w-full h-full object-cover object-top"
            />
          </div>

          <p className="font-bold text-gray-900 tracking-wide transition-all duration-300 group-hover:text-black group-hover:translate-x-1">
            Rishabh Sharma
          </p>
        </div>

        {/* Navigation Links */}
        <ul className="flex items-center gap-1 max-sm:hidden">
          {navLinks.map(({ id, name, type }) => (
            <li 
              key={id} 
              className="group relative px-4 py-1.5 rounded-lg cursor-pointer transition-all duration-300 hover:bg-white/15"
              onClick={() => {
                if (type === "resume") {
                  const link = document.createElement("a");
                  link.href = "/files/resume.pdf";
                  link.download = "Rishabh_Sharma_Resume.pdf"; 
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                  return;
                } 
                if (openWindow) {
                  openWindow(type);
                }
              }}
            >
              <p className="text-sm font-medium text-gray-800 transition-colors duration-300 group-hover:text-black group-hover:font-semibold">
                {name}
              </p>
              <span className="absolute bottom-0 left-1/2 w-0 h-[3px] bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transform -translate-x-1/2 transition-all duration-300 group-hover:w-2/3 shadow-[0_0_8px_#3b82f6]" />
            </li>
          ))}
        </ul>
      </div>

      {/* Right Section: Mac-style App Icons & Live Time */}
      <div className="flex items-center gap-3">
        <ul className="flex items-center gap-4">
          {navIcons.map(({ id, img }) => (
            <li key={id} className="relative group">
              <img 
                src={img} 
                alt={`icon-${id}`} 
                className="w-6 h-6 object-contain cursor-pointer transition-all duration-300 origin-bottom transform group-hover:scale-135 group-hover:-translate-y-2 group-active:scale-95 group-active:translate-y-0 filter group-hover:drop-shadow-[0_10px_10px_rgba(0,0,0,0.15)]"
              />
              <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-gray-800 rounded-full opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:scale-125" />
            </li>
          ))}
        </ul>
        {/* Live ticking clock display */}
        <time className="text-sm font-medium text-gray-800 tabular-nums min-w-[110px] text-right">
          {currentTime}
        </time>
      </div>
    </nav>
  );
};

export default Navbar; 