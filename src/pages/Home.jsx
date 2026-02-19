import Hero from "../components/Hero";
import TrustBar from "../components/TrustBar";
import FeaturedListings from "../components/FeaturedListings";
import LifestyleCategories from "../components/LifestyleCategories";
import Services from "../components/Services";
import Testimonials from "../components/Testimonials"; // Final Additions
import MarketInsights from "../components/MarketInsights";
import FinalCTA from "../components/FinalCTA";
import React from "react";

const Home = () => {
  return (
    <main className="overflow-x-hidden">
      <Hero />
      <TrustBar />
      <FeaturedListings />
      <LifestyleCategories />
      <Services />

      {/* The Final Sequence */}
      <Testimonials />
      <MarketInsights />
      <FinalCTA />
    </main>
  );
};
export default Home;
