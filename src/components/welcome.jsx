import { useEffect, useRef } from "react";
import gsap from "gsap";

const FONT_WEIGHTS = {
  subtitle: { min: 100, max: 400, default: 100 },
  title: { min: 400, max: 900, default: 400 },
};

const renderText = (text, className, baseWeight = 400) => {
  return [...text].map((char, i) => (
    <span
      key={i}
      className={`inline-block opacity-0 translate-y-[100%] transition-colors duration-200 ${className}`}
      style={{
        fontVariationSettings: `'wght' ${baseWeight}`,
        willChange: "transform, opacity, font-variation-settings, text-shadow",
      }}
    >
      {char === " " ? "\u00A0" : char}
    </span>
  ));
};

const Welcome = () => {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    // 1. Awwwards Intro Reveal Timeline
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    tl.to(subtitleRef.current.querySelectorAll("span"), {
      opacity: 1,
      y: 0,
      duration: 1.2,
      stagger: 0.02,
    }).to(
      titleRef.current.querySelectorAll("span"),
      {
        opacity: 1,
        y: 0,
        duration: 1.4,
        stagger: 0.03,
      },
      "-=1.0"
    );

    // 2. High-Performance Gaussian Wave Setup with Text Glow Layer
    const setupTextHover = (container, type) => {
      if (!container) return;
      const letters = container.querySelectorAll("span");
      const { min, max, default: base } = FONT_WEIGHTS[type];

      const animateLetter = (letter, weight, intensity, duration = 0.25) => {
        // Maps the wave intensity into a dynamic neon text shadow matrix
        const blurLarge = intensity * 25;
        const blurSmall = intensity * 10;
        const opacity = intensity * 0.7;

        gsap.to(letter, {
          duration,
          ease: "power2.out",
          fontVariationSettings: `'wght' ${weight}`,
          textShadow: intensity > 0.05 
            ? `0 0 ${blurSmall}px rgba(255, 255, 255, ${opacity}), 0 0 ${blurLarge}px rgba(59, 130, 246, ${opacity})` 
            : "0 0 0px rgba(0,0,0,0)",
          color: intensity > 0.1 ? "#ffffff" : "" // Lets tailwind base colors merge cleanly out of bounds
        });
      };

      const handleMouseMove = (e) => {
        const { left: containerLeft } = container.getBoundingClientRect();
        const mouseX = e.clientX - containerLeft;

        letters.forEach((letter) => {
          const { left: l, width: w } = letter.getBoundingClientRect();
          const distance = Math.abs(mouseX - (l - containerLeft + w / 2));
          
          const intensity = Math.exp(-(distance ** 2) / 15000);

          const targetWeight = min + (max - min) * intensity;
          animateLetter(letter, targetWeight, intensity, 0.15);
        });
      };

      const handleMouseLeave = () => {
        letters.forEach((letter) => {
          animateLetter(letter, base, 0, 0.4);
        });
      };

      container.addEventListener("mousemove", handleMouseMove);
      container.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("mouseleave", handleMouseLeave);
      };
    };

    const cleanupSubtitle = setupTextHover(subtitleRef.current, "subtitle");
    const cleanupTitle = setupTextHover(titleRef.current, "title");

    return () => {
      tl.kill();
      if (cleanupSubtitle) cleanupSubtitle();
      if (cleanupTitle) cleanupTitle();
    };
  }, []);

  return (
    <section id="welcome" ref={containerRef} className="overflow-hidden select-none min-h-[85vh] w-full flex flex-col justify-center items-center bg-transparent px-4">
      
      <p ref={subtitleRef} className="overflow-hidden py-1 whitespace-nowrap text-center cursor-default text-2xl font-light tracking-normal text-slate-300 opacity-90 max-w-full">
        {renderText(
          "Hey, I'm Rishabh! Welcome to my",
          "font-georama",
          FONT_WEIGHTS.subtitle.default
        )}
      </p>
      
      <h1 ref={titleRef} className="mt-2 overflow-hidden py-2 whitespace-nowrap text-center cursor-default max-w-full select-none">
        {renderText(
          "portfolio",
          "text-7xl md:text-8xl lg:text-[7.5rem] font-light font-georama lowercase tracking-normal leading-none text-slate-200",
          FONT_WEIGHTS.title.default
        )}
      </h1>

      <div className="small-screen hidden max-md:block fixed inset-0 bg-black z-50 p-6 text-center content-center">
        <p>This Portfolio is designed for desktop/tablet screens only.</p>
      </div>
    </section>
  );
};

export default Welcome;       