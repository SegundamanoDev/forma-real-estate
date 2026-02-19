import React, { useState } from "react";
import {
  useGetInquiriesQuery,
  useDeleteInquiryMutation,
} from "../features/inquiryApi";
import {
  HiOutlineTrash,
  HiOutlineUser,
  HiOutlineHome,
  HiOutlineClock,
} from "react-icons/hi";
import DeleteModal from "./modals/DeleteModal";

const LeadsTable = () => {
  const { data: inquiries, isLoading } = useGetInquiriesQuery();

  // 1. Destructure 'isLoading' as 'isDeleting' to use in the UI
  const [deleteInquiry, { isLoading: isDeleting }] = useDeleteInquiryMutation();
  const [deleteId, setDeleteId] = useState(null);

  const handleDelete = async () => {
    try {
      await deleteInquiry(deleteId).unwrap();
      setDeleteId(null);
    } catch (err) {
      console.error(err); // Better to log the actual error
    }
  };

  if (isLoading)
    return (
      <div className="flex flex-col items-center justify-center py-32 space-y-4">
        <div className="w-8 h-8 border-4 border-accent border-t-transparent rounded-full animate-spin" />
        <p className="font-serif italic text-gray-400">
          Curating your latest leads...
        </p>
      </div>
    );

  return (
    <div className="bg-white rounded-[2rem] shadow-sm overflow-hidden border border-gray-100">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50/50 border-b border-gray-100">
            <tr>
              <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
                Prospect
              </th>
              <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
                Interest
              </th>
              <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
                Message
              </th>
              <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {inquiries?.data?.map((lead) => (
              <tr
                key={lead._id}
                className="group hover:bg-secondary/30 transition-all duration-300"
              >
                <td className="px-8 py-6">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-2xl bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/10">
                      <HiOutlineUser size={20} />
                    </div>
                    <div>
                      <div className="font-bold text-primary text-sm tracking-tight">
                        {lead.name}
                      </div>
                      <div className="text-[11px] text-gray-400 font-medium">
                        {lead.email}
                      </div>
                    </div>
                  </div>
                </td>

                <td className="px-8 py-6">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2 text-[11px] font-bold text-accent uppercase tracking-wider">
                      <HiOutlineHome size={14} />
                      {lead.listing?.title || "General Inquiry"}
                    </div>
                    <div className="flex items-center gap-1 text-[10px] text-gray-400">
                      <HiOutlineClock size={12} />
                      {new Date(lead.createdAt).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                      })}
                    </div>
                  </div>
                </td>

                <td className="px-8 py-6 max-w-xs">
                  <p className="text-xs text-gray-500 leading-relaxed line-clamp-2 font-light italic">
                    "{lead.message}"
                  </p>
                </td>

                <td className="px-8 py-6 text-right">
                  <button
                    onClick={() => setDeleteId(lead._id)}
                    className="p-3 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all duration-300 active:scale-90"
                  >
                    <HiOutlineTrash size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Empty State */}
      {inquiries?.data?.length === 0 && (
        <div className="py-20 text-center">
          <p className="text-gray-400 font-serif italic">
            No inquiries found in the vault.
          </p>
        </div>
      )}

      <DeleteModal
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="this lead inquiry"
        loading={isDeleting}
      />
    </div>
  );
};

export default LeadsTable;
