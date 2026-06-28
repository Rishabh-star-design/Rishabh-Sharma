import { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { dockApps } from "#constants/index.js";
import { Tooltip } from "react-tooltip";

const Dock = () => {
  const dockRef = useRef(null);
  const iconRefs = useRef([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [openedApps, setOpenedApps] = useState(new Set());
  const audioContextRef = useRef(null);

  // Click Sound
  useEffect(() => {
    audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
  }, []);

  const playClickSound = () => {
    if (!audioContextRef.current) return;
    const oscillator = audioContextRef.current.createOscillator();
    const gain = audioContextRef.current.createGain();
    
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(720, audioContextRef.current.currentTime);
    gain.gain.value = 0.13;
    gain.gain.linearRampToValueAtTime(0.001, audioContextRef.current.currentTime + 0.13);
    
    oscillator.connect(gain);
    gain.connect(audioContextRef.current.destination);
    
    oscillator.start();
    oscillator.stop(audioContextRef.current.currentTime + 0.13);
  };

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
    
    if (iconRefs.current[index]) {
      gsap.to(iconRefs.current[index], {
        scale: 1.55,
        y: -12,           // Lift up on hover
        duration: 0.4,
        ease: "back.out(1.6)",
        overwrite: true
      });
    }
  };

  const handleMouseLeave = (index) => {
    setHoveredIndex(null);
    
    if (iconRefs.current[index]) {
      gsap.to(iconRefs.current[index], {
        scale: 1,
        y: 0,
        duration: 0.45,
        ease: "power3.out"
      });
    }
  };

  const toggleApp = (app, index) => {
    playClickSound();

    if (iconRefs.current[index]) {
      const icon = iconRefs.current[index];
      
      gsap.timeline()
        .to(icon, { 
          y: -8, 
          scale: 0.85, 
          duration: 0.1, 
          ease: "power2.in" 
        })
        .to(icon, { 
          y: -28,      // Strong upward jump
          scale: 1.25, 
          duration: 0.25, 
          ease: "back.out(2.5)" 
        })
        .to(icon, { 
          y: 0, 
          scale: 1, 
          duration: 0.35, 
          ease: "elastic.out(1, 0.5)" 
        });
    }

    setOpenedApps(prev => {
      const newSet = new Set(prev);
      newSet.has(app.id) ? newSet.delete(app.id) : newSet.add(app.id);
      return newSet;
    });
  };

  return (
    <section id="dock" className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <div
        ref={dockRef}
        className="dock-container flex items-end gap-2 bg-white/10 dark:bg-black/40 backdrop-blur-3xl px-6 py-3.5 rounded-3xl border border-white/20 dark:border-white/10 shadow-2xl"
      >
        {dockApps.map(({ id, name, icon, canOpen }, index) => {
          const isOpen = openedApps.has(id);

          return (
            <div
              key={id}
              className="relative flex flex-col items-center group"
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={() => handleMouseLeave(index)}
            >
              <button
                type="button"
                data-app-id={id}
                ref={el => iconRefs.current[index] = el}
                className="dock-icon relative p-2"
                aria-label={name}
                data-tooltip-id="dock-tooltip"
                data-tooltip-content={name}
                data-tooltip-place="top"
                disabled={!canOpen}
                onClick={() => toggleApp({ id, canOpen }, index)}
              >
                <img
                  src={`/images/${icon}`}
                  alt={name}
                  loading="lazy"
                  className={`w-14 h-14 rounded-2xl object-contain transition-all ${
                    !canOpen ? "opacity-40 grayscale" : ""
                  }`}
                />

                {/* Reflection */}
                <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-8 h-2 bg-white/25 blur-sm rounded-full" />
              </button>

              {/* Active Indicator */}
              {isOpen && (
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-white rounded-full shadow-sm" />
              )}
            </div>
          );
        })}

        <Tooltip
          id="dock-tooltip"
          place="top"
          className="tooltip !bg-zinc-900 !text-white !px-4 !py-1.5 !text-sm !rounded-2xl"
          offset={14}
        />
      </div>
    </section>
  );
};

export default Dock;