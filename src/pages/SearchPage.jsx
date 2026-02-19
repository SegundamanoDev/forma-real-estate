import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useGetListingsQuery } from "../features/listingsApi";
import ListingCard from "../components/ListingCard";
import {
  FiFilter,
  FiSearch,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // 1. Local State for Filters and Page
  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);
  const [filters, setFilters] = useState({
    search: searchParams.get("search") || "",
    type: searchParams.get("type") || "",
    propertyType: searchParams.get("propertyType") || "",
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
  });

  const [debouncedSearch, setDebouncedSearch] = useState(filters.search);

  // Debounce logic
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(filters.search);
      setPage(1); // Reset to page 1 when search changes
    }, 500);
    return () => clearTimeout(timer);
  }, [filters.search]);

  // Sync state to URL
  useEffect(() => {
    const params = { ...filters, page };
    Object.keys(params).forEach((key) => {
      if (!params[key]) delete params[key];
    });
    setSearchParams(params);
  }, [filters, page, setSearchParams]);

  // 2. Fetch data (passing page and limit)
  const { data, isLoading, isFetching } = useGetListingsQuery({
    ...filters,
    search: debouncedSearch,
    page,
    limit: 9, // Matching your backend default
  });

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
    setPage(1); // Reset pagination when filters change
  };

  return (
    <main className="pt-32 pb-20 bg-secondary min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        {/* Filter Header */}
        <div className="bg-white p-6 rounded-[2rem] shadow-sm mb-10 flex flex-col lg:flex-row gap-6 items-center border border-gray-100">
          <div className="flex items-center flex-1 bg-secondary px-4 py-1 rounded-2xl w-full border border-transparent focus-within:border-accent/30 transition-all">
            <FiSearch className="text-accent" />
            <input
              name="search"
              value={filters.search}
              placeholder="Search by title or area..."
              className="bg-transparent p-3 outline-none w-full text-sm"
              onChange={handleFilterChange}
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full lg:w-auto">
            <select
              name="type"
              value={filters.type}
              onChange={handleFilterChange}
              className="bg-secondary p-3 rounded-2xl text-sm outline-none cursor-pointer"
            >
              <option value="">All Status</option>
              <option value="sale">For Sale</option>
              <option value="rent">For Rent</option>
            </select>

            <select
              name="propertyType"
              value={filters.propertyType}
              onChange={handleFilterChange}
              className="bg-secondary p-3 rounded-2xl text-sm outline-none cursor-pointer"
            >
              <option value="">All Types</option>
              <option value="apartment">Apartment</option>
              <option value="villa">Villa</option>
              <option value="house">House</option>
            </select>

            <input
              name="minPrice"
              type="number"
              value={filters.minPrice}
              placeholder="Min Price"
              className="bg-secondary p-3 rounded-2xl text-sm outline-none"
              onChange={handleFilterChange}
            />
            <input
              name="maxPrice"
              type="number"
              value={filters.maxPrice}
              placeholder="Max Price"
              className="bg-secondary p-3 rounded-2xl text-sm outline-none"
              onChange={handleFilterChange}
            />
          </div>
        </div>

        {/* Results Info */}
        <div className="mb-8 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <p className="text-primary font-serif text-2xl">
              {data?.total || 0}{" "}
              <span className="text-gray-400 italic font-light">
                Residences Found
              </span>
            </p>
            {isFetching && (
              <div className="h-4 w-4 border-2 border-accent border-t-transparent rounded-full animate-spin" />
            )}
          </div>
        </div>

        {/* Results Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="h-[400px] bg-white rounded-[2.5rem] animate-pulse"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {data?.data?.map((listing) => (
              <ListingCard key={listing._id} listing={listing} />
            ))}
          </div>
        )}

        {/* Pagination Controls */}
        {!isLoading && data?.pages > 1 && (
          <div className="mt-16 flex justify-center items-center gap-4">
            <button
              disabled={page === 1}
              onClick={() => setPage((prev) => prev - 1)}
              className="p-4 rounded-full bg-white text-primary border border-gray-100 hover:bg-accent hover:text-white transition-all disabled:opacity-30 disabled:hover:bg-white disabled:hover:text-primary"
            >
              <FiChevronLeft />
            </button>

            <div className="flex gap-2">
              {[...Array(data.pages).keys()].map((num) => (
                <button
                  key={num + 1}
                  onClick={() => setPage(num + 1)}
                  className={`w-12 h-12 rounded-full font-bold transition-all ${
                    page === num + 1
                      ? "bg-primary text-white shadow-lg"
                      : "bg-white text-gray-400 hover:text-primary"
                  }`}
                >
                  {num + 1}
                </button>
              ))}
            </div>

            <button
              disabled={page === data.pages}
              onClick={() => setPage((prev) => prev + 1)}
              className="p-4 rounded-full bg-white text-primary border border-gray-100 hover:bg-accent hover:text-white transition-all disabled:opacity-30"
            >
              <FiChevronRight />
            </button>
          </div>
        )}
      </div>
    </main>
  );
};

export default SearchPage;
