import { useParams, useNavigate } from "react-router-dom";
import { useGetListingByIdQuery } from "../features/listingsApi";
import { motion } from "framer-motion";
import {
  FaBed,
  FaBath,
  FaRulerCombined,
  FaCheckCircle,
  FaArrowLeft,
} from "react-icons/fa";
import { HiOutlineLocationMarker } from "react-icons/hi";
import ContactAgent from "../components/ContactAgent"; // Ensure this uses a mutation!

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // RTK Query: The 'id' change triggers a fetch or cache retrieval
  const { data, isLoading, error } = useGetListingByIdQuery(id);
  const listing = data?.data || data;
  if (isLoading)
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-secondary">
        <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin mb-4" />
        <p className="font-serif italic text-primary animate-pulse">
          Curating your sanctuary...
        </p>
      </div>
    );

  if (error)
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-red-500 font-bold uppercase tracking-widest">
          Property Not Found
        </p>
      </div>
    );

  const images = listing?.images || [];

  return (
    <main className="bg-secondary min-h-screen pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Navigation & Title */}
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-accent transition-colors"
            >
              <FaArrowLeft /> Back to Collection
            </button>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-center text-accent gap-2 mb-2">
                <HiOutlineLocationMarker />
                <span className="uppercase tracking-[0.3em] font-bold text-[10px]">
                  {listing?.location?.area}, {listing?.location?.city}
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl font-serif text-primary leading-tight">
                {listing?.title}
              </h1>
            </motion.div>
          </div>
          <div className="text-right">
            <p className="text-4xl font-light text-primary">
              ${listing?.price?.toLocaleString()}
              {listing?.type === "rent" && (
                <span className="text-sm font-bold uppercase ml-2 text-gray-400">
                  /mo
                </span>
              )}
            </p>
            <span className="inline-block mt-2 px-4 py-1 bg-white rounded-full text-[10px] font-bold uppercase tracking-widest text-accent border border-accent/20">
              For {listing?.type === "sale" ? "Sale" : "Rent"}
            </span>
          </div>
        </div>

        {/* Bento Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-16 h-[600px]">
          <div className="md:col-span-2 overflow-hidden rounded-[2rem] shadow-2xl">
            <img
              src={images[0]}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
              alt="PrimaryView"
            />
          </div>
          <div className="md:col-span-1 grid grid-rows-2 gap-4">
            <div className="overflow-hidden rounded-[2rem] shadow-lg">
              <img
                src={images[1] || images[0]}
                className="w-full h-full object-cover"
                alt="Interior"
              />
            </div>
            <div className="overflow-hidden rounded-[2rem] shadow-lg">
              <img
                src={images[2] || images[0]}
                className="w-full h-full object-cover"
                alt="Detail"
              />
            </div>
          </div>
          <div className="md:col-span-1 overflow-hidden rounded-[2rem] shadow-lg">
            <img
              src={images[3] || images[0]}
              className="w-full h-full object-cover"
              alt="Exterior"
            />
          </div>
        </div>

        {/* Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2 space-y-12">
            {/* Highlights Grid */}
            <div className="bg-white p-10 rounded-[3rem] shadow-sm flex justify-around border border-gray-100">
              {[
                { icon: FaBed, label: "Bedrooms", val: listing?.bedrooms },
                { icon: FaBath, label: "Bathrooms", val: listing?.bathrooms },
                {
                  icon: FaRulerCombined,
                  label: "Total SqFt",
                  val: listing?.sqft,
                },
              ].map((item, i) => (
                <div key={i} className="text-center">
                  <item.icon className="mx-auto text-accent text-2xl mb-3" />
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                    {item.label}
                  </p>
                  <p className="text-xl font-serif text-primary mt-1">
                    {item.val}
                  </p>
                </div>
              ))}
            </div>

            <div className="prose prose-slate max-w-none">
              <h2 className="text-3xl font-serif text-primary mb-6">
                Architectural Narrative
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed font-light">
                {listing?.description}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {[
                "Smart Automation",
                "Infinity Pool",
                "Concierge Service",
                "Private Lift",
              ].map((feat) => (
                <div
                  key={feat}
                  className="flex items-center gap-4 p-6 bg-white rounded-2xl border border-gray-50"
                >
                  <FaCheckCircle className="text-accent" />
                  <span className="text-xs font-bold uppercase tracking-widest text-primary">
                    {feat}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Sticky Inquiry Section */}
          <aside className="lg:col-span-1">
            <div className="sticky top-32">
              <ContactAgent
                listingId={listing?._id}
                propertyTitle={listing?.title}
              />
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
};

export default PropertyDetails;
