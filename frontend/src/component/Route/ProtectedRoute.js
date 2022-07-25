import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ isAdmin, children }) => {
  const { isAuthenticated, user, loading } = useSelector((state) => state.user);

  if (loading === false && user) {
    if (isAuthenticated === false) {
      return <Navigate to="/login" />;
    }

    if (isAdmin === true && user.role !== "admin") {
      return <Navigate to="/login" />;
    }
    return children ? children : <Outlet />;
  }
};

export default ProtectedRoute;
