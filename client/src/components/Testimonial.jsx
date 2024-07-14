import React from "react";
import image from "../assets/testimonial/Group 167.png";
import image1 from "../assets/testimonial/Mask group-1.png";
import image2 from "../assets/testimonial/Mask group-2.png";
import image3 from "../assets/testimonial/Mask group.png";
import { FaStar } from "react-icons/fa";

function Testimonial() {
  return (
    <div className="flex  w-full md:h-[700px] h-[1200px] gap md:flex-row flex-col mt-[200px] border-2 border-red-600 ">
      {/* left section */}
      <div className="   flex-1 h-full md:order-1 order-2 ">
        <img
          src={image}
          alt=""
          className="h-full object-right mx-auto md:mx-0"
        />
      </div>
      {/* right section */}
      <div className=" flex-1 font-inter flex flex-col gap-8 justify-center text-center md:order-2 order-1">
        <h1 className="text-xl font-bold text-[#FF6868] ">Testimonial</h1>
        <h1 className="lg:text-[45px] custmd:[40px] md:text-[30px] font-bold">
          What Our Customers Say About Us
        </h1>
        <p className="text-[16px] font-medium text-secondary text-center">
          “I had the pleasure of dining at Foodi last night, and I'm still
          raving about the experience! The attention to detail in presentation
          and service was impeccable”
        </p>
        {/* review section  */}

        <div>
          <div className="relative z-50 ">
            <div className="absolute top-1 md:left-0 sm:left-[80px] left-[80px]">
              <img src={image3} alt="" />
            </div>
            <div className="absolute md:left-[50px] sm:left-[140px] left-[140px]  top-0">
              <img src={image1} alt="" />
            </div>
            <div className="absolute md:left-[100px] sm:left-[200px] left-[200px] top-0">
              <img src={image2} alt="" />
            </div>
          </div>
          <div className="md:ml-[200px] sm:ml-[350px] sm:mt-2  flex flex-col items-start ml-[120px] mt-[120px] ">
            <p className="lg:text-xl custmd:text-[17px] font-semibold ">
              Customer Feedback
            </p>
            <div className="flex gap-2 items-center ">
              <FaStar className="text-yellow-400" />
              <div className="flex">
                <span className="text-gray-600">4.8</span>
                <span>(10k Reviews)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Testimonial;
