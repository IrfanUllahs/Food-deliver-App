// TemporaryDrawer.js
import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUser,
  FaCalendarAlt,
  FaFileInvoiceDollar,
  FaShoppingCart,
  FaBook,
  FaTruck,
  FaHome,
  FaStore,
  FaEnvelope,
  FaQuestionCircle,
} from "react-icons/fa";
import { TiThMenu } from "react-icons/ti";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import { Menu } from "@mui/material";

export default function TemporaryDrawer() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const Sidebar = () => (
    <div className="bg-green-500 h-full font-inter pt-2 ">
      <div className="flex items-center mb-8 custmd:px-4 px-1">
        <img
          src="https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="Profile"
          className="w-16 h-16 rounded-full mr-4 object-cover"
        />
        <div>
          <div className="font-bold custmd:text-[28px] md:text-[22px] text-white">
            Mark Peter
          </div>
          <div className="custmd:text-[16px] md:text-[12px] font-bold text-white">
            New York, USA
          </div>
        </div>
      </div>
      <hr />
      <nav className="font-cinzel font-bold text-black custmd:text-[16px] md:text-[14px] my-3">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `flex items-center py-2 px-4 hover:bg-green-600 rounded transition duration-200 ${
              isActive ? "text-white" : "text-black"
            }`
          }
        >
          <FaTachometerAlt className="mr-3 text-[25px]" />
          <span className="transition duration-200">DASHBOARD</span>
        </NavLink>
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `flex items-center py-2 px-4 hover:bg-green-600 rounded transition duration-200 ${
              isActive ? "text-white" : "text-black"
            }`
          }
        >
          <FaUser className="mr-3 text-[25px]" />
          <span className="transition duration-200">PROFILE</span>
        </NavLink>
        <NavLink
          to="/reservation"
          className={({ isActive }) =>
            `flex items-center py-2 px-4 hover:bg-green-600 rounded transition duration-200 ${
              isActive ? "text-white" : "text-black"
            }`
          }
        >
          <FaCalendarAlt className="mr-3 text-[25px]" />
          <span className="transition duration-200">RESERVATION</span>
        </NavLink>
        <NavLink
          to="/payment-history"
          className={({ isActive }) =>
            `flex items-center py-2 px-4 hover:bg-green-600 rounded transition duration-200 ${
              isActive ? "text-white" : "text-black"
            }`
          }
        >
          <FaFileInvoiceDollar className="mr-3 text-[25px]" />
          <span className="transition duration-200">PAYMENT HISTORY</span>
        </NavLink>
        <NavLink
          to="/cart"
          className={({ isActive }) =>
            `flex items-center py-2 px-4 hover:bg-green-600 rounded transition duration-200 ${
              isActive ? "text-white" : "text-black"
            }`
          }
        >
          <FaShoppingCart className="mr-3 text-[25px]" />
          <span className="transition duration-200">MY CART</span>
        </NavLink>
        <NavLink
          to="/bookings"
          className={({ isActive }) =>
            `flex items-center py-2 px-4 hover:bg-green-600 rounded transition duration-200 ${
              isActive ? "text-white" : "text-black"
            }`
          }
        >
          <FaBook className="mr-3 text-[25px]" />
          <span className="transition duration-200">MY BOOKINGS</span>
        </NavLink>
        <NavLink
          to="/order-tracking"
          className={({ isActive }) =>
            `flex items-center py-2 px-4 hover:bg-green-600 rounded transition duration-200 ${
              isActive ? "text-white" : "text-black"
            }`
          }
        >
          <FaTruck className="mr-3 text-[25px]" />
          <span className="transition duration-200">ORDER TRACKING</span>
        </NavLink>
      </nav>
      <hr />
      <div className="mt-3 font-cinzel font-bold text-black custmd:text-[16px] md:text-[14px] custmd:px-4 px-1">
        <NavLink
          to="/home"
          className={({ isActive }) =>
            `flex items-center py-2 px-4 hover:bg-green-600 rounded transition duration-200 ${
              isActive ? "text-white" : "text-black"
            }`
          }
        >
          <FaHome className="mr-3 text-[25px]" />
          <span className="transition duration-200">BACK TO HOME</span>
        </NavLink>
        <NavLink
          to="/shop"
          className={({ isActive }) =>
            `flex items-center py-2 px-4 hover:bg-green-600 rounded transition duration-200 ${
              isActive ? "text-white" : "text-black"
            }`
          }
        >
          <FaStore className="mr-3 text-[25px]" />
          <span className="transition duration-200">SHOP</span>
        </NavLink>
        <NavLink
          to="/contact"
          className={({ isActive }) =>
            `flex items-center py-2 px-4 hover:bg-green-600 rounded transition duration-200 ${
              isActive ? "text-white" : "text-black"
            }`
          }
        >
          <FaEnvelope className="mr-3 text-[25px]" />
          <span className="transition duration-200">CONTACT</span>
        </NavLink>
        <NavLink
          to="/faq"
          className={({ isActive }) =>
            `flex items-center py-2 px-4 hover:bg-green-600 rounded transition duration-200 ${
              isActive ? "text-white" : "text-black"
            }`
          }
        >
          <FaQuestionCircle className="mr-3 text-[25px]" />
          <span className="transition duration-200">FAQ</span>
        </NavLink>
      </div>
    </div>
  );

  return (
    <div>
      <button
        onClick={toggleDrawer(true)}
        className="bg-primary p-1 text-white rounded-md"
      >
        <TiThMenu className="text-[35px] " />
      </button>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        <Sidebar />
      </Drawer>
    </div>
  );
}
