import { motion, AnimatePresence } from "framer-motion";
import React from "react";

const DeleteModal = ({ isOpen, onClose, onConfirm, title }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center px-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-primary/40 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative bg-white p-8 rounded-3xl shadow-2xl max-w-sm w-full text-center"
          >
            <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
              <span className="material-icons">priority_high</span>
            </div>
            <h3 className="text-xl font-serif font-bold text-primary mb-2">
              Remove Property?
            </h3>
            <p className="text-gray-500 text-sm mb-8 leading-relaxed">
              Are you sure you want to remove{" "}
              <span className="font-bold text-primary italic">"{title}"</span>?
              This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 py-3 border border-gray-100 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-gray-50 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                className="flex-1 py-3 bg-red-500 text-white rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-red-600 transition-all shadow-lg shadow-red-200"
              >
                Delete
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default DeleteModal;
