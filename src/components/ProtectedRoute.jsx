import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import React from "react";

const ProtectedRoute = ({ children }) => {
  const { userInfo } = useSelector((state) => state.auth);
  const location = useLocation();

  // 1. Check if user is logged in
  if (!userInfo) {
    // We save the 'from' location so we can redirect them back after login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 2. Check if the user has Admin privileges
  if (userInfo.role !== "admin") {
    // If they are a regular 'user', they shouldn't be here
    return <Navigate to="/" replace />;
  }

  // 3. If all checks pass, render the AdminDashboard (children)
  return children;
};

export default ProtectedRoute;
