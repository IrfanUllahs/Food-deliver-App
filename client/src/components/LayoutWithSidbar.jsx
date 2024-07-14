import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidbar";
import TemporaryDrawer from "./TempDrawer";
function LayoutWithSidbar() {
  return (
    <div className="min-h-screen flex">
      <div className="w-[30%] bg-primary md:block hidden ">
        <Sidebar />
      </div>
      <div className="md:w-[70%] w-full flex ">
        <div className="h-full w-[80px]   flex justify-center pt-12 md:hidden pl-2 cursor-pointer ">
          <TemporaryDrawer />
        </div>
        <Outlet />
      </div>
    </div>
  );
}

export default LayoutWithSidbar;
