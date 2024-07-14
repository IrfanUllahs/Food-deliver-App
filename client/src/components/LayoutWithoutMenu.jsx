// components/LayoutWithoutMenu.js
import React from "react";
import { Outlet } from "react-router-dom";

const LayoutWithoutMenu = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default LayoutWithoutMenu;
