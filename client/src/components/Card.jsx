import React from "react";
import image1 from "../assets/category/img1.png";
import { useState } from "react";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { addToCart } from "../api/cartRequest";
import { useSelector, useDispatch } from "react-redux";
import { setCartProducts } from "../redux/features/cartSlice";

function Card({ fav, title, desc, price, id, handleAddToCart }) {
  function truncateStringToFourWords(str) {
    const words = str.split(" "); // Split the string into words
    if (words.length <= 4) {
      return str; // If there are 4 or fewer words, return the original string
    }
    return words.slice(0, 4).join(" ") + "..."; // Join the first 4 words and add an ellipsis
  }

  return (
    <div className=" bg-white shadow-[0px_-1px_29px_9px_#00000024] rounded-3xl flex items-center justify-center  flex-col hover:scale-105 cursor-pointer transition-all duration-500  py-8 relative px-10  ">
      {fav && (
        <div className="absolute top-0 right-0   bg-primary hover:bg-green-400 rounded-tr-3xl rounded-bl-3xl w-[50px] h-[50px] flex items-center justify-center">
          <CiHeart className="h-8 w-8 text-white" />
        </div>
      )}
      <div className="rounded-full w-[200px] h-[200px] flex items-center justify-center  border-2 ">
        <img
          src={
            "https://img.freepik.com/free-photo/delicious-fried-chicken-plate_144627-27384.jpg?t=st=1720785132~exp=1720788732~hmac=4f2df432c13e79b4ee7824eb01815d64d55bff3313587c0d7f0ab77fcafc1cfb&w=740"
          }
          alt=""
          className="rounded-full w-[100%] h-[100%]"
        />
      </div>

      {price && desc ? (
        <div className="mt-10 flex flex-col gap-3">
          <h1 className="font-semibold text-[25px] font-inter">{title}</h1>
          <p className="font-inter text-[18px] text-secondary font-semibold">
            {truncateStringToFourWords(desc)}
          </p>
          <div className="flex items-center gap-3 justify-between">
            <p className="text-[22px] font-bold">
              <span className="text-red-400 text-[16px]">$</span>
              {price}
            </p>
            <button
              className="button shadow-lg shadow-green-200"
              onClick={() => handleAddToCart(id)}
            >
              Order Now
            </button>
          </div>
        </div>
      ) : (
        <>
          <p className="text-2xl font-bold mt-5">Main Dish</p>
          <p className="text-[15px] font-medium mt-2 text-secondary">
            (86 dishes)
          </p>
        </>
      )}
    </div>
  );
}

export default Card;
