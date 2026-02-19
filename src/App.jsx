import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";

// Layout Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

// Pages
import Home from "./pages/Home";
import SearchPage from "./pages/SearchPage";
import PropertyDetails from "./pages/PropertyDetails";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import React from "react";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-secondary flex flex-col font-sans selection:bg-accent selection:text-white">
        {/* The Navbar stays at the top of every page */}
        <Navbar />

        <main className="flex-grow">
          <Routes>
            {/* --- PUBLIC ROUTES --- */}
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/listing/:id" element={<PropertyDetails />} />
            <Route path="/login" element={<Login />} />

            {/* --- PRIVATE ADMIN ROUTES --- */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>

        {/* The Footer stays at the bottom of every page */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
