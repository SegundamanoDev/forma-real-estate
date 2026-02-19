import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiSearch, FiMapPin } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("sale");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    // We only navigate if there's a query, or just go to search with the type
    const searchPath = query
      ? `/search?search=${query}&type=${type}`
      : `/search?type=${type}`;
    navigate(searchPath);
  };

  // Animation variants for cleaner JSX
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <section className="relative h-[90vh] md:h-[95vh] w-full flex items-center justify-center overflow-hidden bg-primary">
      {/* Background Layer */}
      <div className="absolute inset-0 z-0">
        <motion.div
          initial={{ scale: 1.15 }}
          animate={{ scale: 1 }}
          transition={{ duration: 15, ease: "linear" }}
          className="h-full w-full"
        >
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2000"
            alt="Luxury Real Estate"
            className="w-full h-full object-cover brightness-[0.7] contrast-[1.1]"
          />
        </motion.div>

        {/* IMPROVED OVERLAYS */}
        {/* 1. Overall Darkening Tint */}
        <div className="absolute inset-0 bg-black/40" />

        {/* 2. Gradient Scrim: Focused on the bottom and top for text contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-primary" />

        {/* 3. Radial Vignette: Darkens the corners to focus light on the center text */}
        <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_20%,rgba(0,0,0,0.4)_100%)]" />
      </div>

      {/* Hero Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-5xl px-6 flex flex-col items-center"
      >
        <motion.span
          variants={itemVariants}
          className="text-accent uppercase tracking-[0.4em] text-[10px] md:text-xs font-bold mb-4 drop-shadow-md"
        >
          Established 2004 — Premium Realty
        </motion.span>

        <motion.h1
          variants={itemVariants}
          className="text-5xl md:text-8xl font-serif text-white mb-6 leading-[1.1] text-center drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)]"
        >
          Refined Living <br />
          <span className="italic font-light text-white/90">Begins Here</span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-white/80 text-base md:text-lg font-light max-w-xl text-center mb-12 leading-relaxed drop-shadow-sm"
        >
          A curated collection of the most prestigious properties. Verified
          listings, unparalleled service, and architectural excellence.
        </motion.p>

        {/* The Glassmorphism Search Hub - Increased opacity for better legibility */}
        <motion.form
          variants={itemVariants}
          onSubmit={handleSearch}
          className="w-full bg-black/20 backdrop-blur-2xl p-2 rounded-3xl md:rounded-full border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col md:flex-row items-center group transition-all duration-500 focus-within:border-accent/50"
        >
          {/* ... (Rest of the form input and buttons remain same) */}
          <div className="flex items-center w-full px-6 py-4 md:py-0">
            <FiMapPin className="text-accent text-xl mr-3 shrink-0" />
            <input
              type="text"
              placeholder="Where would you like to live?"
              className="bg-transparent w-full text-white placeholder:text-white/60 focus:outline-none text-sm md:text-base font-light"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          {/* ... */}
        </motion.form>
      </motion.div>
    </section>
  );
};

export default Hero;
