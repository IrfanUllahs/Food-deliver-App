import React, { useRef } from "react";
import Card from "./Card";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";

function SpecialDisches({ data }) {
  const slider = useRef(null);
  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "red" }}
        onClick={onClick}
      />
    );
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "green" }}
        onClick={onClick}
      />
    );
  }
  var settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  return (
    <div className="h-[550px] border-2 borderyel overflow-hidden ">
      <div className="flex justify-end gap-3">
        <button
          onClick={() => slider?.current?.slickPrev()}
          className="bg-[#EFEFEF] h-12 rounded-full w-12 hover:text-white flex items-center justify-center hover:bg-primary text-secondary  "
        >
          <FaArrowLeft />
        </button>
        <button
          onClick={() => slider?.current?.slickNext()}
          className="bg-[#EFEFEF] h-12  w-12 hover:text-white flex items-center justify-center hover:bg-primary text-secondary  rounded-full"
        >
          <FaArrowRight />
        </button>
      </div>
      <Slider ref={slider} {...settings}>
        {data.map((item, i) => (
          <div key={i} className="sm:p-10 px-4 py-10 ">
            <Card
              title={item.name}
              desc={item.recipe}
              price={item.price}
              fav={true}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default SpecialDisches;
