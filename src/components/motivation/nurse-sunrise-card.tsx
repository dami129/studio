
"use client";

import { useEffect, useState } from "react";

function getTimeGradient() {
  const hour = new Date().getHours();

  // 🌅 Morning (5am – 11am)
  if (hour >= 5 && hour < 11) {
    return {
      bg: "from-sky-300 via-blue-200 to-white",
      sun: "bg-orange-400",
      text: "A New Day Begins",
      textColor: "text-slate-800",
      subtitleColor: "text-slate-600",
      iconFill: "rgba(51, 65, 85, 0.25)" // slate-700 at 25%
    };
  }

  // ☀️ Afternoon (11am – 5pm)
  if (hour >= 11 && hour < 17) {
    return {
      bg: "from-blue-200 via-sky-100 to-white",
      sun: "bg-yellow-300",
      text: "Keep Shining Today",
      textColor: "text-slate-800",
      subtitleColor: "text-slate-600",
      iconFill: "rgba(51, 65, 85, 0.25)"
    };
  }

  // 🌇 Evening (5pm – 8pm)
  if (hour >= 17 && hour < 20) {
    return {
      bg: "from-orange-200 via-rose-100 to-indigo-200",
      sun: "bg-orange-300",
      text: "You’ve Done Great Today",
      textColor: "text-white drop-shadow-sm",
      subtitleColor: "text-white/90",
      iconFill: "rgba(255, 255, 255, 0.3)" // white at 30%
    };
  }

  // 🌙 Night (8pm – 5am)
  return {
    bg: "from-indigo-400 via-slate-800 to-slate-900",
    sun: "bg-indigo-300",
    text: "Rest. Recharge. You Matter.",
    textColor: "text-white drop-shadow-sm",
    subtitleColor: "text-white/90",
    iconFill: "rgba(255, 255, 255, 0.3)"
  };
}

export default function NurseSunriseCard() {
  const [theme, setTheme] = useState({
      bg: "from-sky-300 via-blue-200 to-white",
      sun: "bg-orange-400",
      text: "A New Day Begins",
      textColor: "text-slate-800",
      subtitleColor: "text-slate-600",
      iconFill: "rgba(51, 65, 85, 0.25)"
  });

  useEffect(() => {
    // Set initial theme without waiting for hydration
    setTheme(getTimeGradient());

    const interval = setInterval(() => {
      setTheme(getTimeGradient());
    }, 60 * 1000); // re-check every minute

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`relative h-52 overflow-hidden rounded-2xl 
      bg-gradient-to-br ${theme.bg} p-6 shadow-md transition-all duration-1000 ease-in-out`}
    >
      {/* Text */}
      <div className="relative z-10 max-w-sm">
        <h2 className={`text-xl font-bold ${theme.textColor} transition-colors duration-1000`}>
          {theme.text}
        </h2>
        <p className={`mt-1 text-sm ${theme.subtitleColor} transition-colors duration-1000`}>
          Your care brings hope with every sunrise.
        </p>
      </div>

      {/* 🌞 Animated Sunrise */}
       <div
        className={`sunrise absolute bottom-[-80px] right-[-80px] 
        h-96 w-96 rounded-full ${theme.sun} transition-colors duration-1000`}
      />

       {/* Soft sky overlay */}
      <div className="absolute inset-0 bg-white/10" />

      {/* Nurse silhouette */}
      <div className="absolute bottom-4 left-6">
        <svg
          width="110"
          height="110"
          viewBox="0 0 24 24"
          fill={theme.iconFill}
          className="transition-colors duration-1000"
        >
          <path d="M12 2C9.79 2 8 3.79 8 6c0 1.66 1.01 3.09 2.44 3.68L10 12h4l-.44-2.32C14.99 9.09 16 7.66 16 6c0-2.21-1.79-4-4-4zm-6 18v-2c0-2.76 4-4 6-4s6 1.24 6 4v2H6z"/>
        </svg>
      </div>
    </div>
  );
}
