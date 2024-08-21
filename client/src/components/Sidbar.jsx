import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
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

const Sidebar = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="bg-green-500  h-full font-inter pt-2 ">
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
      <nav className="font-cinzel font-bold text-black custmd:text-[16px] md:text-[14px]  my-3">
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
        {!user?.role && (
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
        )}
        <NavLink
          to="/paymenthistory"
          className={({ isActive }) =>
            `flex items-center py-2 px-4 hover:bg-green-600 rounded transition duration-200 ${
              isActive ? "text-white" : "text-black"
            }`
          }
        >
          <FaFileInvoiceDollar className="mr-3 text-[25px]" />
          <span className="transition duration-200">PAYMENT HISTORY</span>
        </NavLink>
        {!user?.role && (
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
        )}
        {user?.role ? (
          <NavLink
            to="/bookings"
            className={({ isActive }) =>
              `flex items-center py-2 px-4 hover:bg-green-600 rounded transition duration-200 ${
                isActive ? "text-white" : "text-black"
              }`
            }
          >
            <FaBook className="mr-3 text-[25px]" />
            <span className="transition duration-200">All BOOKINGS</span>
          </NavLink>
        ) : (
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
        )}
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
        <NavLink
          to="/products"
          className={({ isActive }) =>
            `flex items-center py-2 px-4 hover:bg-green-600 rounded transition duration-200 ${
              isActive ? "text-white" : "text-black"
            }`
          }
        >
          <FaTruck className="mr-3 text-[25px]" />
          <span className="transition duration-200">Products</span>
        </NavLink>
      </nav>
      <hr />
      <div className="mt-3 font-cinzel font-bold text-black custmd:text-[16px] md:text-[14px]  px-1">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center py-2 px-4 hover:bg-green-600 rounded transition duration-200 ${
              isActive ? "text-white" : "text-black"
            }`
          }
        >
          <FaHome className="mr-3 text-[25px]" />
          <span className="transition duration-200">BACK TO HOME</span>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
