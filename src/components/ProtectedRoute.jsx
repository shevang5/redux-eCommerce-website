import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const users = useSelector((state) => state.usersReducer.users);
  const user = users?.length > 0 ? users[0] : null;

  if (!user) {
    // Not logged in
    return <Navigate to="/login" />;
  }

  if (adminOnly && !user.isAdmin) {
    // Logged in but not an admin
    return <Navigate to="/home" />;
  }

  return children;
};

export default ProtectedRoute;
