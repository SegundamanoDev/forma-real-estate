import React, { useState } from "react";
import PropertyForm from "../components/PropertyForm";
import LeadsTable from "../components/LeadsTable";
import PropertyManager from "../components/PropertyManager";
import { useGetListingsQuery } from "../features/listingsApi";
import { useGetInquiriesQuery } from "../features/inquiryApi";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("add");

  // RTK Query calls (cached data)
  const { data: listings } = useGetListingsQuery();
  const { data: leads } = useGetInquiriesQuery();

  const stats = [
    {
      label: "Portfolio Value",
      value: listings?.data?.reduce((acc, curr) => acc + curr.price, 0) || 0,
      isCurrency: true,
    },
    { label: "Total Assets", value: listings?.data?.length || 0 },
    { label: "Active Leads", value: leads?.data?.length || 0 },
  ];

  return (
    <div className="pt-32 pb-20 bg-secondary min-h-screen">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h1 className="text-4xl font-serif text-primary tracking-tight">
              Master Dashboard
            </h1>
            <p className="text-gray-400 mt-2 font-medium">
              Executive control of your property portfolio.
            </p>
          </div>

          {/* 3-Way Toggle Switch */}
          <div className="flex bg-white p-1.5 rounded-[2rem] shadow-sm border border-gray-100 self-start">
            {["add", "manage", "leads"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-8 py-3 rounded-[1.5rem] text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-500 ${
                  activeTab === tab
                    ? "bg-primary text-white shadow-xl shadow-primary/20"
                    : "text-gray-400 hover:text-primary"
                }`}
              >
                {tab === "add" ? "Add New" : tab}
                {tab === "leads" && leads?.data?.length > 0 && (
                  <span className="ml-2 bg-accent text-white px-2 py-0.5 rounded-full text-[8px]">
                    {leads.data.length}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm"
            >
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">
                {stat.label}
              </p>
              <h2 className="text-3xl font-serif text-primary">
                {stat.isCurrency
                  ? `$${stat.value.toLocaleString()}`
                  : stat.value}
              </h2>
            </div>
          ))}
        </div>

        {/* Dynamic Content Area */}
        <div className="transition-all duration-700">
          {activeTab === "add" && <PropertyForm />}
          {activeTab === "manage" && <PropertyManager />}
          {activeTab === "leads" && <LeadsTable />}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
