"use client";
import { motion } from "framer-motion";

const ShinyButton = ({ onClick, disabled, children }) => {
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      className="relative w-full mt-4 px-8 py-3 rounded-xl font-semibold text-white overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
      style={{
        background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
        boxShadow: "0 0 20px rgba(99, 102, 241, 0.5)",
      }}
    >
      {/* Shiny sweep */}
      <motion.div
        className="absolute top-0 left-0 w-1/3 h-full"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
          skewX: "-20deg",
        }}
        animate={{ left: ["-40%", "140%"] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatDelay: 2,
          ease: "easeInOut",
        }}
      />
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
};

export default ShinyButton;
