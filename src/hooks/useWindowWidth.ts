// src/hooks/useWindowWidth.ts
import { useState, useEffect } from "react";

const getDefaultWidth = () => {
  // Assuming a default width that matches most mobile devices or your target audience's most common resolution
  return typeof window !== "undefined" ? window.innerWidth : 768; // Or whatever default width makes sense for your design
};

const useWindowWidth = (): number => {
  const [windowWidth, setWindowWidth] = useState<number>(getDefaultWidth());

  useEffect(() => {
    const updateWidth = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", updateWidth);
    updateWidth(); // Initialize state with current window width

    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  return windowWidth;
};

export default useWindowWidth;
