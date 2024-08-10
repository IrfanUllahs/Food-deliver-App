import React, { useEffect, useRef, useState } from "react";
import Card from "./Card";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import axios from "axios";

function SpecialDisches() {
  const [data, setdata] = useState([]);
  const slider = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const baseUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(baseUrl + "/api/food/getfoods/no");

        setdata(data.recipes);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

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
    <>
      <div className="font-inter flex flex-col gap-16 mt-10 mb-20">
        <p className="text-xl font-bold text-[#FF6868] ">Special Dishes</p>
        <div className="flex flex-col gap-6">
          <h1 className="text-5xl font-bold  ">Standout Dishes</h1>
          <h1 className="text-5xl font-bold  ">From Our Menu</h1>
        </div>
      </div>
      <div className="h-[580x]  borderyel overflow-hidden flex flex-col gap-10  ">
        <div className="flex justify-end gap-3 mr-5">
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
        {isLoading ? (
          <h1 className="text-5xl font-bold text-center">Loading...</h1>
        ) : (
          <div>
            <Slider ref={slider} {...settings}>
              {data?.map((item, i) => (
                <div key={i} className="sm:p-10 px-4 py-10 ">
                  <Card
                    title={item.shortName}
                    desc={item.recipe}
                    price={item.price}
                    image={item.image}
                    id={item._id}
                    fav={true}
                  />
                </div>
              ))}
            </Slider>
          </div>
        )}
      </div>
    </>
  );
}

export default SpecialDisches;
