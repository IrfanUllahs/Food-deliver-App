import React from "react";
import { FaPlay } from "react-icons/fa";
import image1 from "../assets/HeroImage/spiceyNodles.png";
import salad from "../assets/HeroImage/salad.png";
import FiveStar from "./FiveStar";

function Hero() {
  return (
    <div className="flex items-center md:h-[450px] md:flex-row flex-col h-[1000px]  ">
      {/* left section */}
      <div className="md:w-[40%] w-full h-[40%] flex flex-col justify-center text-center ">
        <h1 className="custmd:text-4xl lg:text-[50px] text-3xl font-extrabold font-inter">
          Dive into Delights
        </h1>
        <h1 className="custmd:text-4xl lg:text-[50px] text-3xl font-extrabold font-inter mt-5">
          Of Delectable <span className="text-primary">Food</span>
        </h1>
        <p className="text-xl font-inter mt-5 text-[#4A4A4A] font-medium">
          Where Each Plate Weaves a Story of Culinary Mastery and Passionate
          Craftsmanship
        </p>
        <div className="flex items-center mt-10 cursor-pointer justify-center custmd:gap-10 gap-3">
          <button className="button shadow-lg shadow-green-200">
            Order Now
          </button>
          <p className="text-xl font-inter text-[#4D4D4D] font-medium">
            Watch Video
          </p>
          <div className="text-secondary text-xl flex items-center justify-center bg-white rounded-full h-10 w-10 shadow-lg shadow-gray-300 p-2">
            <FaPlay />
          </div>
        </div>
      </div>
      {/* right section */}
      <div className="md:w-[60%] w-full md:h-full h-[60%] right flex gap-4 relative ">
        {/* show case 1 */}
        <div className="h-20 w-56 bg-white rounded-lg flex gap-2 p-2 shadow-xl absolute bottom-8 sm:bottom-5 left-[20%] lg:left-[10%] md:left-[40%]">
          <img src={image1} alt="spicy noodles" className="rounded-md h-full" />
          <div className="flex flex-col justify-center font-semibold font-inter">
            <p>Spicy Noodles</p>
            <FiveStar />
            <p>
              <span className="text-red-400 text-[13px]">$</span>18.00
            </p>
          </div>
        </div>
        {/* show case 2 */}
        <div className="h-20 w-56 bg-white rounded-lg lg:flex hidden gap-2 p-2 shadow-xl absolute  sm:bottom-5 left-[60%] sm:left-[350px]">
          <img
            src={salad}
            alt="vegetarian salad"
            className="rounded-md h-full"
          />
          <div className="flex flex-col justify-center font-semibold font-inter">
            <p>Vegetarian Salad</p>
            <FiveStar />
            <p>
              <span className="text-red-400 text-[13px]">$</span>24.00
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
