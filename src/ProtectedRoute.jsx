import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, allowedRoles = [] }) {
  const role = localStorage.getItem("role");
  const isLogged = localStorage.getItem("logged_in");

  if (!isLogged || !role) {
    return <Navigate to="/login" replace />;
  }

  // إلا كان خاص رول معين
  if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
