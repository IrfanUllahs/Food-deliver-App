// components/LayoutWithMenu.js
import React from "react";
import { Outlet } from "react-router-dom";
import MenuBar from "./MenuBar";
import Footer from "./Footer";

const LayoutWithMenu = () => {
  return (
    <div className="max-w-screen-xl mx-auto  ">
      <MenuBar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default LayoutWithMenu;
