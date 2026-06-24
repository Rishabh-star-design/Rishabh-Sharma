
import dayjs from "dayjs";
import { navLinks, navIcons } from "#constants/index.js";

// 1. Accept the active window handler from props (e.g., openWindow)
const Navbar = ({ openWindow }) => {
  return (
    <nav className="flex justify-between items-center bg-white/30 backdrop-blur-3xl p-2 px-5 select-none transition-all duration-500 border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.03)]">
      {/* Left Section: Logo & Text Links */}
      <div className="flex items-center gap-6">
        {/* Brand Logo */}
        <div className="flex items-center gap-2 group cursor-pointer">
          <img 
            src="/images/logo.svg" 
            alt="logo" 
            className="w-6 h-6 transition-all duration-500 group-hover:scale-125 group-hover:rotate-[360deg] filter group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]"
          />
          <p className="font-bold text-gray-900 tracking-wide transition-all duration-300 group-hover:text-black group-hover:translate-x-1">
            Rishabh Sharma
          </p>
        </div>

        {/* Navigation Links */}
        <ul className="flex items-center gap-1 max-sm:hidden">
          {/* 2. Destructure 'type' along with id and name */}
          {navLinks.map(({ id, name, type }) => (
            <li 
              key={id} 
              className="group relative px-4 py-1.5 rounded-lg cursor-pointer transition-all duration-300 hover:bg-white/15"
              // 3. Add the click handler here
              onClick={() => {
  if (type === "resume") {
    // 1. Create a temporary anchor element
    const link = document.createElement("a");
    link.href = "/files/resume.pdf";
    
    // 2. Add the download attribute (forces the browser to download instead of opening)
    link.download = "Rishabh_Sharma_Resume.pdf"; 
    
    // 3. Trigger the click and clean up
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    return; // Stops execution so no system windows open
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

      {/* Right Section: Mac-style App Icons */}
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
        <time>{dayjs().format("ddd MMM h:mm A")} </time>
      </div>
    </nav>
  );
};

export default Navbar;