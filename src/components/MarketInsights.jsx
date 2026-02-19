import React from "react";

const articles = [
  {
    category: "Market Report",
    title: "The Rise of Sustainable Luxury: 2026 Outlook",
    date: "Feb 12, 2026",
  },
  {
    category: "Investment",
    title: "Why Coastal Estates are Outperforming the Index",
    date: "Jan 28, 2026",
  },
];

const MarketInsights = () => (
  <section className="py-24 bg-white">
    <div className="max-w-7xl mx-auto px-6">
      <div className="flex justify-between items-end mb-16">
        <div>
          <h2 className="text-4xl font-serif text-primary">Market Insights</h2>
          <p className="text-gray-400 mt-2">
            Intelligence for the modern investor.
          </p>
        </div>
        <button className="text-[10px] font-bold uppercase tracking-widest border-b border-primary pb-1">
          View All Journal
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        {articles.map((post, i) => (
          <div
            key={i}
            className="group cursor-pointer border-b border-gray-100 pb-8"
          >
            <p className="text-accent text-[10px] font-bold uppercase tracking-[0.2em] mb-4">
              {post.category}
            </p>
            <h3 className="text-2xl font-serif text-primary group-hover:text-accent transition-colors duration-300 mb-4 leading-snug">
              {post.title}
            </h3>
            <p className="text-gray-400 text-xs uppercase tracking-widest">
              {post.date}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default MarketInsights;
