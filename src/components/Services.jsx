import React from "react";
import { FiShield, FiKey, FiTrendingUp } from "react-icons/fi";

const services = [
  {
    icon: FiShield,
    title: "Curated Portfolio",
    desc: "Every property in our collection is hand-vetted for architectural significance.",
  },
  {
    icon: FiKey,
    title: "Private Access",
    desc: "Gain entry to off-market listings not available on public platforms.",
  },
  {
    icon: FiTrendingUp,
    title: "Market Intelligence",
    desc: "Data-driven insights to ensure your sanctuary is also a sound investment.",
  },
];

const Services = () => (
  <section className="py-24 bg-primary text-white">
    <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-16">
      {services.map((s, i) => (
        <div
          key={i}
          className="flex flex-col items-center text-center space-y-6"
        >
          <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-accent text-2xl">
            <s.icon />
          </div>
          <h3 className="text-2xl font-serif">{s.title}</h3>
          <p className="text-white/40 font-light leading-relaxed">{s.desc}</p>
        </div>
      ))}
    </div>
  </section>
);

export default Services;
