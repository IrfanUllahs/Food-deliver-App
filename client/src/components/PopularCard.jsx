import React from "react";

import { useState } from "react";

import { Link } from "react-router-dom";
function Card({ id, image, recipe, count }) {
  return (
    <Link
      to={`/menu/${id}`}
      className=" bg-white shadow-[0px_-1px_29px_9px_#00000024] rounded-3xl flex items-center justify-center  flex-col hover:shadow-lg hover:shadow-green-200 cursor-pointer transition-all duration-300  py-8 relative px-10 border-[2px]  "
    >
      <div className="rounded-full w-[80px] h-[80px] flex items-center justify-center bg-[#C1F1C6] p-2   ">
        <img
          src={image}
          alt=""
          className="rounded-full w-[100%] h-[100%] object-cover"
        />
      </div>

      <>
        <p className="text-2xl font-bold mt-5">{recipe}</p>
        <p className="text-[15px] font-medium mt-2 text-secondary">
          ({count ? (count > 10 ? count : "0" + count) : "00"})
        </p>
      </>
    </Link>
  );
}

export default Card;
