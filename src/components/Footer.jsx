import React from "react";
import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="bg-primary text-white py-24 border-t border-white/5">
    <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-16 md:gap-12">
      {/* BRAND SECTION */}
      <div className="col-span-1 md:col-span-2">
        <div className="flex flex-col leading-none mb-8">
          <span className="text-3xl font-serif font-bold tracking-[0.25em] text-white">
            FORMA
          </span>
          <span className="text-[8px] tracking-[0.6em] font-sans font-light uppercase mt-2 text-accent">
            Real Estate
          </span>
        </div>
        <p className="text-white/50 max-w-sm leading-relaxed text-sm font-light">
          A curated portfolio of the world's most prestigious residences.
          Defining the future of architectural sanctuary through discretion and
          unparalleled service.
        </p>
      </div>

      {/* QUICK LINKS */}
      <div>
        <h4 className="font-bold uppercase tracking-[0.2em] text-[10px] mb-8 text-accent">
          Navigation
        </h4>
        <ul className="space-y-4 text-xs tracking-wide text-white/60">
          <li className="hover:text-white cursor-pointer transition-colors duration-300">
            Featured Estates
          </li>
          <li className="hover:text-white cursor-pointer transition-colors duration-300">
            Private Collection
          </li>
          <li className="hover:text-white cursor-pointer transition-colors duration-300">
            Market Insights
          </li>
          <li className="hover:text-white cursor-pointer transition-colors duration-300">
            Privacy & Terms
          </li>
        </ul>
      </div>

      {/* CONTACT & PORTAL */}
      <div className="flex flex-col justify-between">
        <div>
          <h4 className="font-bold uppercase tracking-[0.2em] text-[10px] mb-8 text-accent">
            Connect
          </h4>
          <a
            href="mailto:concierge@forma.com"
            className="text-sm text-white/80 hover:text-accent transition-colors duration-300 font-serif italic"
          >
            concierge@forma.com
          </a>
        </div>

        <div className="mt-12">
          <h4 className="font-bold uppercase tracking-[0.2em] text-[10px] mb-4 text-white/40">
            Staff Portal
          </h4>
          <Link
            to="/login"
            className="text-[10px] uppercase tracking-widest text-white/30 hover:text-accent transition-colors duration-300"
          >
            Agent Access
          </Link>
        </div>
      </div>
    </div>

    {/* BOTTOM BAR */}
    <div className="max-w-7xl mx-auto px-6 mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
      <p className="text-[10px] tracking-widest text-white/20 uppercase">
        © 2026 FORMA Real Estate Collective
      </p>
      <div className="flex gap-8 text-[10px] tracking-widest text-white/20 uppercase">
        <span className="hover:text-white/40 cursor-pointer transition">
          Instagram
        </span>
        <span className="hover:text-white/40 cursor-pointer transition">
          LinkedIn
        </span>
      </div>
    </div>
  </footer>
);

export default Footer;
