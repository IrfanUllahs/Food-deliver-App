import React, { useEffect } from "react";
import logo from "../assets/Group 164.png";
import { IoSearch } from "react-icons/io5";
import { AiOutlineShopping } from "react-icons/ai";
import ProfileMenu from "./profileMenu";
import { Link, NavLink, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import { getLengthOfcart } from "../api/cartRequest";
function MenuBar() {
  const user = useSelector((state) => state.auth.user);
  const cartProducts = useSelector((state) => state.cart.cartProducts);
  const [cartLength, setCartLength] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    console.log("first");
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const getCartLength = async () => {
      const response = await getLengthOfcart();
      setCartLength(response.data);
    };
    if (user) {
      getCartLength();
    }
  }, [user, cartProducts]);
  return (
    <nav className="flex justify-between items-center pt-6 px-2">
      {/* logo section */}
      <Link to={"/"}>
        <img src={logo} alt="logo" className="w-[100px] h-[41]" />
      </Link>
      {/* menu section */}
      <div className="md:block hidden">
        <div className="flex gap-4 font-poppins text-xl font-medium">
          <NavLink
            to="/"
            className={({ isActive }) =>
              (isActive ? "text-primary" : "") +
              " relative overflow-hidden group"
            }
          >
            {({ isActive }) => (
              <>
                Home
                <div
                  className={`h-[3px] w-full bg-primary absolute bottom-0 ${
                    isActive ? "left-0" : "-left-[100%]"
                  } group-hover:left-0 transition-all duration-500 rounded-full`}
                ></div>
              </>
            )}
          </NavLink>
          <NavLink
            to="/menu"
            className={({ isActive }) =>
              (isActive ? "text-primary" : "") +
              " relative overflow-hidden group"
            }
          >
            {({ isActive }) => (
              <>
                Menu
                <div
                  className={`h-[3px] w-full bg-primary absolute bottom-0 ${
                    isActive ? "left-0" : "-left-[100%]"
                  } group-hover:left-0 transition-all duration-500 rounded-full`}
                ></div>
              </>
            )}
          </NavLink>
          <NavLink
            to="/services"
            className={({ isActive }) =>
              (isActive ? "text-primary" : "") +
              " relative overflow-hidden group"
            }
          >
            {({ isActive }) => (
              <>
                Services
                <div
                  className={`h-[3px] w-full bg-primary absolute bottom-0 ${
                    isActive ? "left-0" : "-left-[100%]"
                  } group-hover:left-0 transition-all duration-500 rounded-full`}
                ></div>
              </>
            )}
          </NavLink>
          <NavLink
            to="/offers"
            className={({ isActive }) =>
              (isActive ? "text-primary" : "") +
              " relative overflow-hidden group"
            }
          >
            {({ isActive }) => (
              <>
                Offers
                <div
                  className={`h-[3px] w-full bg-primary absolute bottom-0 ${
                    isActive ? "left-0" : "-left-[100%]"
                  } group-hover:left-0 transition-all duration-500 rounded-full`}
                ></div>
              </>
            )}
          </NavLink>
        </div>
      </div>
      {/* call to action */}
      <div>
        <ul className="flex gap-4 items-center">
          <li>
            <IoSearch className=" text-[25px] cursor-pointer" />
          </li>
          {user && !user?.role && (
            <Link to="/cart">
              <li className="relative cursor-pointer">
                <AiOutlineShopping className=" text-[25px]" />
                <span className="absolute top-0 -right-2 rounded-full bg-primary text-white w-4 h-4 flex justify-center items-center">
                  {cartLength}
                </span>
              </li>
            </Link>
          )}
          {user ? (
            <li
              className="cursor-pointer bg-gray-300 rounded-full h-[50px] w-[50px] flex items-center justify-center"
              onClick={handleClick}
            >
              <img
                src={user?.image}
                alt="profile"
                className="w-[40px] h-[40px] rounded-full"
              />
            </li>
          ) : (
            <Link to="/login">
              <button className="button !px-4">Login</button>
            </Link>
          )}
        </ul>
      </div>
      <ProfileMenu anchorEl={anchorEl} open={open} onClose={handleClose} />
    </nav>
  );
}

export default MenuBar;
