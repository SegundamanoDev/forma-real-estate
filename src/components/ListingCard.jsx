import React from "react";
import { motion } from "framer-motion";
import { FaBed, FaBath, FaRulerCombined } from "react-icons/fa";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { Link } from "react-router-dom";

const ListingCard = ({ listing }) => {
  // Determine Currency Symbol - Defaulting to Naira if applicable
  const currencySymbol = listing?.currency === "USD" ? "$" : "₦";

  return (
    <motion.div
      whileHover={{ y: -12 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] transition-all duration-500 border border-gray-100 group flex flex-col h-full"
    >
      <Link to={`/listing/${listing?._id}`} className="flex flex-col h-full">
        {/* Image Container */}
        <div className="relative h-72 w-full overflow-hidden">
          <img
            src={
              listing?.images?.[0] ||
              "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1000"
            }
            alt={listing?.title}
            className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
          />

          {/* Status Tag - Glassmorphism style */}
          <div className="absolute top-5 left-5 bg-white/20 backdrop-blur-xl border border-white/30 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] text-white shadow-xl">
            {listing?.type === "sale" ? "For Sale" : "For Rent"}
          </div>

          {/* Price Tag Overlay - Premium floating effect */}
          <div className="absolute bottom-5 right-5 bg-primary/90 backdrop-blur-md text-white px-5 py-2.5 rounded-2xl font-bold text-lg shadow-2xl border border-white/10">
            {currencySymbol}
            {listing?.price?.toLocaleString()}
            {listing?.type === "rent" && (
              <span className="text-[10px] opacity-60 ml-1">/yr</span>
            )}
          </div>
        </div>

        {/* Content Details */}
        <div className="p-8 flex flex-col flex-grow">
          <div className="flex items-center text-accent mb-3 gap-2">
            <HiOutlineLocationMarker className="text-sm" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em]">
              {listing?.location?.area} • {listing?.location?.city}
            </span>
          </div>

          <h3 className="text-2xl font-serif font-medium text-primary mb-6 leading-tight group-hover:text-accent transition-colors line-clamp-2">
            {listing?.title}
          </h3>

          {/* Spacer to push stats to the bottom */}
          <div className="flex-grow" />

          {/* Quick Stats Grid - Refined spacing */}
          <div className="flex justify-between items-center pt-6 border-t border-gray-50 text-gray-400">
            <div className="flex flex-col items-center gap-1 group/stat">
              <FaBed className="text-primary/20 group-hover:text-accent transition-colors" />
              <span className="text-[11px] font-bold text-primary italic">
                {listing?.features?.bedrooms || 0}{" "}
                <span className="font-light not-italic text-gray-400">
                  Beds
                </span>
              </span>
            </div>
            <div className="h-8 w-[1px] bg-gray-100" /> {/* Vertical Divider */}
            <div className="flex flex-col items-center gap-1 group/stat">
              <FaBath className="text-primary/20 group-hover:text-accent transition-colors" />
              <span className="text-[11px] font-bold text-primary italic">
                {listing?.features?.bathrooms || 0}{" "}
                <span className="font-light not-italic text-gray-400">
                  Baths
                </span>
              </span>
            </div>
            <div className="h-8 w-[1px] bg-gray-100" /> {/* Vertical Divider */}
            <div className="flex flex-col items-center gap-1 group/stat">
              <FaRulerCombined className="text-primary/20 group-hover:text-accent transition-colors" />
              <span className="text-[11px] font-bold text-primary italic">
                {listing?.features?.sqft || 0}{" "}
                <span className="font-light not-italic text-gray-400">
                  sqft
                </span>
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ListingCard;
