// src/hooks/useWindowWidth.ts
import { useState, useEffect } from "react";

const getDefaultWidth = () => {
  // Default width for SSR
  return 768;
};

const useWindowWidth = (): number => {
  const [windowWidth, setWindowWidth] = useState<number>(getDefaultWidth());

  useEffect(() => {
    const updateWidth = () => {
      setWindowWidth(window.innerWidth);
    };

    // Check if window is defined to avoid SSR issues
    if (typeof window !== "undefined") {
      window.addEventListener("resize", updateWidth);
      updateWidth(); // Initialize state with current window width

      return () => window.removeEventListener("resize", updateWidth);
    }
  }, []);

  return windowWidth;
};

export default useWindowWidth;
