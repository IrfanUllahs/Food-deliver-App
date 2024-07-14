import React from "react";
import Card from "./Card";
import Slider from "react-slick";

function PopularCategory() {
  var settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "linear",
    pauseOnHover: true,
    pauseOnFocus: true,
    responsive: [
      {
        breakpoint: 10000,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="font-inter flex flex-col gap-12 mt-10 mb-16">
      <p className="text-xl font-bold text-[#FF6868] text-center">
        Customer Favorites
      </p>
      <h1 className="text-5xl font-bold text-center">Popular Catagories</h1>
      <div className="grid lg:grid-cols-4 gap-11 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 px-4">
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  );
}

export default PopularCategory;
