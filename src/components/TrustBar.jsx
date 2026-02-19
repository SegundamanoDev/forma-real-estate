// src/components/TrustBar.jsx
import React from "react";
import { motion } from "framer-motion";

const logos = [
  "Architectural Digest",
  "Vogue Living",
  "Forbes Real Estate",
  "Sotheby's",
  "The Wall Street Journal",
];

const TrustBar = () => {
  return (
    <section className="py-12 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-center text-[10px] uppercase tracking-[0.3em] text-gray-400 mb-8 font-bold">
          As Featured & Trusted In
        </p>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-40 grayscale">
          {logos.map((logo) => (
            <motion.span
              key={logo}
              whileHover={{ opacity: 1, grayscale: 0 }}
              className="text-primary font-serif italic text-lg md:text-xl cursor-default transition-all"
            >
              {logo}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBar;
