import { AuthContext } from "@/Context/AuthContext";
import React, { use } from "react";
import { Navigate, useLocation } from "react-router";

const PrivetRoute = ({ children }) => {
  const { user, isLoading } = use(AuthContext);
  const location = useLocation();

  if (isLoading) {
    return <span className="">Loading...</span>;
  }
  if (!user) {
    return (
      <Navigate state={{ from: location.pathname }} to="/login"></Navigate>
    );
  }
  return children;
};

export default PrivetRoute;
