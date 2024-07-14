import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

function UserRoute() {
  const user = useSelector((state) => state.auth.user);
  if (!user) {
    return <h1>loadings</h1>;
  }
  return user && !user?.role ? <Outlet /> : <Navigate to="/" />;
}

export default UserRoute;
