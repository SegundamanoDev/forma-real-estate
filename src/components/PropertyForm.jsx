import React, { useState, useEffect } from "react";
import {
  HiOutlineCloudUpload,
  HiOutlineX,
  HiOutlineCheckCircle,
} from "react-icons/hi";
import { useCreateListingMutation } from "../features/listingsApi"; // Assuming this exists in your API slice

const PropertyForm = () => {
  const [createListing, { isLoading, isSuccess }] = useCreateListingMutation();

  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "sale",
    propertyType: "apartment",
    price: "",
    address: "",
    city: "",
    area: "",
    bedrooms: "",
    bathrooms: "",
    sqft: "",
    parking: false,
    pool: false,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages((prev) => [...prev, ...files]);

    const filePreviews = files.map((file) => URL.createObjectURL(file));
    setPreviews((prev) => [...prev, ...filePreviews]);
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
    setPreviews(previews.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    // Append top-level fields
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    // Append images
    images.forEach((image) => {
      data.append("images", image);
    });

    try {
      await createListing(data).unwrap();
      // Reset form on success
      setImages([]);
      setPreviews([]);
      e.target.reset();
    } catch (err) {
      alert(err?.data?.message || "Error creating masterpiece");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700"
    >
      {/* 1. Header & Title */}
      <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100">
        <label className="block text-[10px] font-bold uppercase tracking-[0.2em] mb-4 text-accent">
          Property Identity
        </label>
        <input
          name="title"
          onChange={handleInputChange}
          required
          className="w-full border-b border-gray-100 py-4 focus:border-primary outline-none transition-all text-primary font-serif text-3xl placeholder:text-gray-200"
          placeholder="Enter Listing Title..."
        />
        <textarea
          name="description"
          onChange={handleInputChange}
          placeholder="Describe the lifestyle and luxury amenities..."
          className="w-full mt-6 p-4 bg-secondary/30 rounded-2xl outline-none text-sm text-gray-600 h-32 resize-none"
        />
      </div>

      {/* 2. Financials & Type */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100">
          <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
            Asking Price
          </label>
          <input
            name="price"
            type="number"
            onChange={handleInputChange}
            required
            className="w-full mt-2 text-xl font-bold text-primary outline-none"
            placeholder="$ 0.00"
          />
        </div>
        <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100">
          <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
            Listing Type
          </label>
          <select
            name="type"
            onChange={handleInputChange}
            className="w-full mt-2 text-sm font-medium text-primary outline-none bg-transparent capitalize"
          >
            <option value="sale">For Sale</option>
            <option value="rent">For Rent</option>
          </select>
        </div>
        <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100">
          <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
            Property Category
          </label>
          <select
            name="propertyType"
            onChange={handleInputChange}
            className="w-full mt-2 text-sm font-medium text-primary outline-none bg-transparent capitalize"
          >
            <option value="apartment">Apartment</option>
            <option value="villa">Villa</option>
            <option value="penthouse">Penthouse</option>
            <option value="mansion">Mansion</option>
          </select>
        </div>
      </div>

      {/* 3. Specifications */}
      <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 grid grid-cols-2 md:grid-cols-4 gap-8">
        {["bedrooms", "bathrooms", "sqft", "area"].map((field) => (
          <div key={field}>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2 capitalize">
              {field}
            </label>
            <input
              name={field}
              type={field === "area" ? "text" : "number"}
              onChange={handleInputChange}
              className="w-full border-b border-gray-50 pb-2 outline-none font-bold text-primary"
              placeholder="--"
            />
          </div>
        ))}
      </div>

      {/* 4. Visual Assets */}
      <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h4 className="text-sm font-bold uppercase tracking-widest text-primary">
            Gallery Assets
          </h4>
          <span className="text-[10px] text-gray-400">
            {images.length} Files Selected
          </span>
        </div>

        <label className="flex flex-col items-center justify-center border-2 border-dashed border-secondary rounded-[2rem] py-16 cursor-pointer hover:bg-secondary/20 transition-all group">
          <HiOutlineCloudUpload className="text-5xl text-gray-300 group-hover:text-accent group-hover:scale-110 transition-all" />
          <p className="mt-4 text-xs font-bold text-gray-400 uppercase tracking-widest">
            Drop 4K Imagery Here
          </p>
          <input
            type="file"
            multiple
            onChange={handleImageChange}
            className="hidden"
          />
        </label>

        {previews.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-8">
            {previews.map((url, i) => (
              <div
                key={i}
                className="relative aspect-square rounded-2xl overflow-hidden group shadow-md"
              >
                <img
                  src={url}
                  className="w-full h-full object-cover"
                  alt="Preview"
                />
                <button
                  type="button"
                  onClick={() => removeImage(i)}
                  className="absolute top-2 right-2 p-1 bg-white/90 rounded-full text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <HiOutlineX />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 5. Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-primary text-white py-6 rounded-[2rem] font-bold uppercase tracking-[0.3em] text-xs hover:bg-accent transition-all duration-500 shadow-2xl shadow-primary/20 flex items-center justify-center gap-3 disabled:bg-gray-200"
      >
        {isLoading ? (
          <>
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Architecting Your Listing...
          </>
        ) : isSuccess ? (
          <>
            <HiOutlineCheckCircle className="text-xl" />
            Masterpiece Published
          </>
        ) : (
          "Publish to Signature Collection"
        )}
      </button>
    </form>
  );
};

export default PropertyForm;
