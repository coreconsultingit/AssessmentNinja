// src/components/ScrollProgress.tsx
import { useEffect, useState } from "react";

const ScrollProgress = () => {
  const [scroll, setScroll] = useState(0);

  const handleScroll = () => {
    const scrolled = window.scrollY;
    const height = document.documentElement.scrollHeight - window.innerHeight;
    const percent = (scrolled / height) * 100;
    setScroll(percent);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 h-1 z-[60] bg-blue-600 transition-all duration-150 ease-out"
      style={{ width: `${scroll}%` }}
    />
  );
};

export default ScrollProgress;
