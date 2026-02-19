import React, { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { useSendInquiryMutation } from "../features/inquiryApi"; // Import the mutation

const ContactAgent = ({ listingId, propertyTitle }) => {
  // 1. Initialize the mutation hook
  const [sendInquiry, { isLoading }] = useSendInquiryMutation();
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // 2. Call the mutation instead of axios
      // .unwrap() allows us to catch errors specifically for this call
      await sendInquiry({ ...formData, listing: listingId }).unwrap();
      setSubmitted(true);
    } catch (err) {
      console.error("Failed to save inquiry:", err);
      alert(err?.data?.message || "Something went wrong. Please try again.");
    }
  };

  if (submitted) {
    return (
      <div className="bg-accent/10 p-8 rounded-3xl text-center border border-accent/20 animate-in fade-in zoom-in duration-500">
        <div className="w-16 h-16 bg-accent text-white rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="material-icons">check</span>
        </div>
        <h3 className="text-xl font-serif text-primary mb-2">Message Sent</h3>
        <p className="text-sm text-gray-600 mb-4">
          Our verified agent will contact you shortly regarding{" "}
          <strong>{propertyTitle}</strong>.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-primary p-8 rounded-3xl text-white shadow-xl sticky top-32">
      <h3 className="text-xl font-serif mb-2">Inquire Directly</h3>
      <p className="text-white/60 text-sm mb-6">
        Experience this sanctuary in person.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          required
          placeholder="Full Name"
          className="w-full bg-white/10 border border-white/20 p-4 rounded-xl focus:outline-none focus:border-accent transition-all"
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <input
          required
          type="email"
          placeholder="Email Address"
          className="w-full bg-white/10 border border-white/20 p-4 rounded-xl focus:outline-none focus:border-accent transition-all"
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <textarea
          rows="4"
          placeholder="I'm interested in this property..."
          className="w-full bg-white/10 border border-white/20 p-4 rounded-xl focus:outline-none focus:border-accent transition-all"
          onChange={(e) =>
            setFormData({ ...formData, message: e.target.value })
          }
        ></textarea>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-accent hover:bg-accent-hover text-white py-4 rounded-xl font-bold uppercase tracking-widest transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Sending Inquiry..." : "Request Details"}
        </button>

        <div className="relative flex py-2 items-center">
          <div className="flex-grow border-t border-white/10"></div>
          <span className="flex-shrink mx-4 text-white/30 text-xs font-bold">
            OR
          </span>
          <div className="flex-grow border-t border-white/10"></div>
        </div>

        <a
          href={`https://wa.me/2340000000000?text=Hello, I am interested in ${propertyTitle}`}
          target="_blank"
          rel="noreferrer"
          className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-[#25D366]/20"
        >
          <FaWhatsapp className="text-xl" />
          Chat on WhatsApp
        </a>
      </form>
    </div>
  );
};

export default ContactAgent;
