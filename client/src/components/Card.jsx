import React from "react";

import { useState } from "react";
import { CiHeart } from "react-icons/ci";

import { Link } from "react-router-dom";
function Card({ fav, title, desc, price, id, image, recipe }) {
  function truncateStringToFourWords(str) {
    const words = str.split(" "); // Split the string into words
    if (words.length <= 4) {
      return str; // If there are 4 or fewer words, return the original string
    }
    return words.slice(0, 4).join(" ") + "..."; // Join the first 4 words and add an ellipsis
  }

  return (
    <Link
      to={`/productdetail/${id}`}
      className=" bg-white shadow-[0px_-1px_29px_9px_#00000024] rounded-3xl flex items-center justify-center  flex-col hover:shadow-lg hover:shadow-green-200 cursor-pointer transition-all duration-300  py-8 relative px-10 border-[2px]  "
    >
      <>
        <div className="absolute top-0 right-0   bg-primary hover:bg-green-400 rounded-tr-3xl rounded-bl-3xl w-[50px] h-[50px] flex items-center justify-center">
          <CiHeart className="h-8 w-8 text-white" />
        </div>
        <div className="rounded-full w-[200px] h-[200px] flex items-center justify-center   ">
          <img
            src={image}
            alt=""
            className="rounded-full w-[100%] h-[100%] object-cover"
          />
        </div>
      </>

      <div className="mt-10 flex flex-col gap-3">
        <h1 className="font-semibold text-[22px] font-inter">{title}</h1>
        <p className="font-inter text-[18px] text-secondary font-semibold">
          {truncateStringToFourWords(desc)}
        </p>
        <div className="flex items-center gap-3 justify-between">
          <p className="text-[22px] font-bold">
            <span className="text-red-400 text-[16px]">$</span>
            {price}
          </p>
          <button className="button shadow-lg shadow-green-200">
            Explore it
          </button>
        </div>
      </div>
    </Link>
  );
}

export default Card;
