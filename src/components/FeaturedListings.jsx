import React from "react";
import { useGetListingsQuery } from "../features/listingsApi";
import ListingCard from "./ListingCard";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const FeaturedListings = () => {
  // Fetching with a limit of 6
  const { data, isLoading, isError } = useGetListingsQuery({ limit: 6 });

  // Use the nested data array from your backend response
  const listings = data?.data || [];

  return (
    <section className="py-24 bg-secondary">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-xl">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-accent font-bold uppercase tracking-[0.3em] text-[10px]"
            >
              Curated Selection
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-serif text-primary mt-2"
            >
              Exquisite Properties for the Discerning Eye
            </motion.h2>
          </div>
          <Link
            to="/search"
            className="text-primary font-bold border-b-2 border-accent pb-1 hover:text-accent transition-all text-sm uppercase tracking-widest"
          >
            Explore All
          </Link>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="h-[450px] bg-gray-200 animate-pulse rounded-[2.5rem]"
              />
            ))}
          </div>
        )}

        {/* Error or Empty State */}
        {!isLoading && (isError || listings.length === 0) && (
          <div className="text-center py-20 bg-white rounded-[2.5rem] border-2 border-dashed border-gray-100">
            <p className="text-gray-400 font-serif italic text-lg">
              The portfolio is currently being updated. Please check back
              shortly.
            </p>
          </div>
        )}

        {/* Data Grid */}
        {!isLoading && listings.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {listings.map((listing, index) => (
              <motion.div
                key={listing._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.1,
                  ease: [0.21, 0.45, 0.32, 0.9],
                }}
                viewport={{ once: true }}
              >
                <ListingCard listing={listing} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedListings;
