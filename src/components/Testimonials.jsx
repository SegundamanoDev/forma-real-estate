import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const stories = [
  {
    name: "Jonathan Sterling",
    role: "Private Equity Partner",
    quote:
      "The acquisition of our Greenwich estate was handled with a level of surgical precision I've rarely seen in residential real estate.",
    context: "Estate Purchaser",
  },
  {
    name: "Elena Rossi",
    role: "Creative Director",
    quote:
      "FORMA understands that a home is more than square footage. It is a canvas for life. They found us a modernist masterpiece that feels like a gallery.",
    context: "Residential Client",
  },
  {
    name: "Dr. Aris Thorne",
    role: "Tech Consultant",
    quote:
      "Discretion was my primary requirement. The team managed the entire off-market transaction without a single leak to the press.",
    context: "Penthouse Owner",
  },
  {
    name: "Marcus Whitmore",
    role: "Venture Capitalist",
    quote:
      "Their market insights are superior. They steered me away from a 'trendy' zip code toward a legacy property that has already appreciated 15%.",
    context: "Investment Client",
  },
  {
    name: "Isabella Martinez",
    role: "Philanthropist",
    quote:
      "The concierge service didn't end at the closing. They curated the interior design team that turned our villa into a true sanctuary.",
    context: "International Buyer",
  },
  {
    name: "Samuel Kwong",
    role: "Industrialist",
    quote:
      "A seamless bridge between luxury and logic. They understand the emotional weight of a home and the financial weight of an asset.",
    context: "Portfolio Client",
  },
  {
    name: "Catherine Beaumont",
    role: "Legacy Founder",
    quote:
      "They don't just sell property; they curate heritage. My family now has a coastal retreat that will serve generations to come.",
    context: "Verified Purchaser",
  },
  {
    name: "Julian Vane",
    role: "Architectural Historian",
    quote:
      "Finding a broker who understands the value of brutalist architecture is rare. FORMA speaks the language of design fluently.",
    context: "Estate Client",
  },
  {
    name: "Sofia Lindholm",
    role: "E-Commerce CEO",
    quote:
      "The efficiency of the digital portal combined with the warmth of the private agents makes FORMA the only choice for modern executives.",
    context: "Premium Tenant",
  },
  {
    name: "Nathaniel Drax",
    role: "Aviation Executive",
    quote:
      "The most professional acquisition experience of my career. Every detail—from air quality to acoustic insulation—was vetted before I arrived.",
    context: "Sanctuary Owner",
  },
];

const Testimonials = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev === stories.length - 1 ? 0 : prev + 1));
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const next = () =>
    setIndex((prev) => (prev === stories.length - 1 ? 0 : prev + 1));
  const prev = () =>
    setIndex((prev) => (prev === 0 ? stories.length - 1 : prev - 1));

  return (
    <section className="relative py-32 md:py-48 overflow-hidden bg-primary">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
        <div className="absolute top-10 left-10 w-96 h-96 bg-accent rounded-full blur-[150px]" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-accent uppercase tracking-[0.4em] text-[10px] font-bold">
            The FORMA Standard
          </span>
          <h2 className="text-white font-serif text-3xl mt-4 italic">
            Client Narratives
          </h2>
        </div>

        <div className="relative h-[350px] md:h-[280px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-center space-y-10"
            >
              <h3 className="text-2xl md:text-4xl font-serif text-white/90 leading-relaxed font-light italic px-4 md:px-12">
                "{stories[index].quote}"
              </h3>

              <div className="flex flex-col items-center justify-center">
                <div className="flex items-center gap-3">
                  <span className="text-white font-bold tracking-[0.2em] uppercase text-[11px]">
                    {stories[index].name}
                  </span>
                  <span className="h-4 w-[1px] bg-white/30" />
                  <span className="text-white/60 tracking-[0.1em] uppercase text-[10px]">
                    {stories[index].role}
                  </span>
                </div>
                <p className="text-accent text-[9px] uppercase tracking-[0.3em] mt-3 font-medium">
                  {stories[index].context}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Controls */}
        <div className="flex justify-center items-center gap-12 mt-16">
          <button
            onClick={prev}
            className="text-white/30 hover:text-accent transition-colors"
          >
            <FiChevronLeft size={24} />
          </button>
          <div className="flex gap-3">
            {stories.map((_, i) => (
              <div
                key={i}
                className={`h-[1px] transition-all duration-700 ${
                  i === index ? "w-10 bg-accent" : "w-3 bg-white/10"
                }`}
              />
            ))}
          </div>
          <button
            onClick={next}
            className="text-white/30 hover:text-accent transition-colors"
          >
            <FiChevronRight size={24} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
