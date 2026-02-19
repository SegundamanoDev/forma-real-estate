import { motion } from "framer-motion";
import React from "react";

const FinalCTA = () => (
  <section className="py-24 bg-secondary px-6">
    <div className="max-w-5xl mx-auto bg-primary rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
      {/* Subtle Design Element */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />

      <div className="relative z-10">
        <h2 className="text-3xl md:text-6xl font-serif text-white mb-8">
          Can't find your <span className="italic">perfect sanctuary?</span>
        </h2>
        <p className="text-white/60 text-lg font-light max-w-xl mx-auto mb-12 leading-relaxed">
          Allow our private acquisitions team to source off-market estates
          tailored specifically to your architectural requirements.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-accent text-white px-12 py-5 rounded-full font-bold uppercase tracking-[0.2em] text-[10px] shadow-2xl shadow-accent/20"
        >
          Consult an Agent
        </motion.button>
      </div>
    </div>
  </section>
);

export default FinalCTA;
