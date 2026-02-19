// src/components/LifestyleCategories.jsx
import React from "react";
import { motion } from "framer-motion";

const categories = [
  {
    title: "Waterfront Living",
    img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800",
    grid: "md:col-span-2",
  },
  {
    title: "Penthouse Suite",
    img: "https://images.unsplash.com/photo-1600607687940-47a04b629571?auto=format&fit=crop&w=800",
    grid: "md:col-span-1",
  },
  {
    title: "Modernist Estates",
    img: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=800",
    grid: "md:col-span-1",
  },
  {
    title: "Alpine Retreats",
    img: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=800",
    grid: "md:col-span-2",
  },
];

const LifestyleCategories = () => (
  <section className="py-24 px-6 bg-secondary">
    <div className="max-w-7xl mx-auto">
      <div className="mb-12">
        <h2 className="text-4xl font-serif text-primary mb-2">
          Curated Collections
        </h2>
        <p className="text-gray-500 font-light">
          Search by the lifestyle you desire.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.map((cat, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -10 }}
            className={`relative h-[400px] rounded-[2rem] overflow-hidden group cursor-pointer ${cat.grid}`}
          >
            <img
              src={cat.img}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              alt={cat.title}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
            <div className="absolute bottom-8 left-8">
              <h3 className="text-white text-2xl font-serif">{cat.title}</h3>
              <p className="text-accent text-xs uppercase tracking-widest mt-2">
                Explore Collection —
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default LifestyleCategories;
