import { useState } from "react";
import {
  useGetListingsQuery,
  useDeleteListingMutation,
} from "../features/listingsApi";
import {
  HiOutlinePencilAlt,
  HiOutlineTrash,
  HiOutlinePlus,
  HiOutlineExternalLink,
} from "react-icons/hi";
import DeleteModal from "./modals/DeleteModal";
import PropertyForm from "./PropertyForm";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const PropertyManager = () => {
  const { data, isLoading } = useGetListingsQuery();
  const [deleteListing, { isLoading: isDeleting }] = useDeleteListingMutation();

  const [deleteId, setDeleteId] = useState(null);
  const [editProperty, setEditProperty] = useState(null);

  const confirmDelete = async () => {
    try {
      await deleteListing(deleteId).unwrap();
      setDeleteId(null);
    } catch (err) {
      console.error("Failed to delete property:", err);
    }
  };

  if (isLoading)
    return (
      <div className="flex flex-col items-center justify-center py-32 space-y-4">
        <div className="w-10 h-10 border-4 border-accent border-t-transparent rounded-full animate-spin" />
        <p className="font-serif italic text-gray-400">
          Loading your luxury portfolio...
        </p>
      </div>
    );

  return (
    <div className="space-y-6">
      {/* Action Header */}
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-xl font-serif text-primary">Manage Collection</h3>
        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
          {data?.data?.length || 0} Total Listings
        </p>
      </div>

      <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50/50 border-b border-gray-100">
            <tr>
              <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
                Property
              </th>
              <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
                Status
              </th>
              <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
                Price
              </th>
              <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {data?.data?.map((item) => (
              <tr
                key={item._id}
                className="group hover:bg-secondary/30 transition-all duration-300"
              >
                <td className="px-8 py-6">
                  <div className="flex items-center gap-5">
                    <div className="relative h-14 w-14 overflow-hidden rounded-2xl shadow-sm">
                      <img
                        src={
                          item.images?.[0] || "https://via.placeholder.com/150"
                        }
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        alt={item.title}
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-primary text-sm tracking-tight">
                        {item.title}
                      </h4>
                      <div className="flex items-center gap-1 text-[10px] text-accent font-bold uppercase tracking-widest mt-1">
                        {item.location.area}, {item.location.city}
                      </div>
                    </div>
                  </div>
                </td>

                <td className="px-8 py-6">
                  <span
                    className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest ${
                      item.type === "sale"
                        ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                        : "bg-blue-50 text-blue-600 border border-blue-100"
                    }`}
                  >
                    For {item.type === "sale" ? "Buy" : "Rent"}
                  </span>
                </td>

                <td className="px-8 py-6 text-sm font-serif font-bold text-primary">
                  ${item.price?.toLocaleString()}
                </td>

                <td className="px-8 py-6 text-right">
                  <div className="flex justify-end items-center gap-2">
                    <Link
                      to={`/listing/${item._id}`}
                      target="_blank"
                      className="p-3 text-gray-400 hover:text-primary transition-colors"
                      title="View Public Page"
                    >
                      <HiOutlineExternalLink size={18} />
                    </Link>
                    <button
                      onClick={() => setEditProperty(item)}
                      className="p-3 text-gray-400 hover:text-accent hover:bg-accent/5 rounded-2xl transition-all"
                    >
                      <HiOutlinePencilAlt size={20} />
                    </button>
                    <button
                      onClick={() => setDeleteId(item._id)}
                      className="p-3 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all"
                    >
                      <HiOutlineTrash size={20} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation */}
      <DeleteModal
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={confirmDelete}
        loading={isDeleting}
        title={data?.data?.find((p) => p._id === deleteId)?.title}
      />

      {/* Full Screen Edit Overlay */}
      <AnimatePresence>
        {editProperty && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] overflow-y-auto bg-white"
          >
            <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-gray-100 px-8 py-6">
              <div className="max-w-5xl mx-auto flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-serif text-primary">
                    Edit Sanctuary
                  </h2>
                  <p className="text-[10px] text-accent font-bold uppercase tracking-[0.2em] mt-1">
                    Modifying: {editProperty.title}
                  </p>
                </div>
                <button
                  onClick={() => setEditProperty(null)}
                  className="bg-primary text-white p-3 rounded-full hover:bg-black transition-all flex items-center justify-center"
                >
                  <HiOutlinePlus className="rotate-45" size={24} />
                </button>
              </div>
            </div>

            <div className="max-w-5xl mx-auto px-8 py-16">
              <PropertyForm
                initialData={editProperty}
                isEditing={true}
                closeForm={() => setEditProperty(null)}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PropertyManager;
