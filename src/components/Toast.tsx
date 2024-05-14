import React, { useEffect } from "react";

interface ToastProps {
  message: string;
  show: boolean;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, show, onClose }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000); // Auto-close after 5 seconds
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div
      className="fixed bottom-5 right-5 z-50 max-w-xs p-4 border-0 rounded-lg shadow-md cursor-pointer flex items-center justify-between text-[#333] bg-[#f3f4f6] border-[#d1d3e2]"
      onClick={onClose}
      style={{
        animation: "slideIn 0.5s ease forwards",
      }}>
      <span>{message}</span>
      <button
        onClick={onClose}
        className="ml-4 text-lg"
        style={{ background: "none", border: "none" }}>
        &times;
      </button>
      <style jsx>{`
        @keyframes slideIn {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};
