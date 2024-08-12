import React, { useEffect, useState } from "react";
import Card from "./PopularCard";
import Slider from "react-slick";
import axios from "axios";
function PopularCategory({ popularData }) {
  const [countData, setCountData] = useState([]);
  const baseUlr = import.meta.env.VITE_API_URL;
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(baseUlr + "/api/food/getfoodscount");

      setCountData(data);
    };
    fetchData();
  }, []);
  const getCount = (value) => {
    const count = countData?.find((item) => {
      if (item._id === value) {
        return item.count;
      }
    });
    return count?.count;
  };

  return (
    <div className="font-inter flex flex-col gap-16 mt-10 mb-20">
      <p className="text-xl font-bold text-[#FF6868] text-center">
        Customer Favorites
      </p>
      <h1 className="text-5xl font-bold text-center mb-3">
        Popular Catagories
      </h1>
      <div className="grid lg:grid-cols-4 gap-11 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 px-4">
        {popularData?.map((item, index) => {
          return (
            <Card
              key={item.id}
              image={item.image}
              recipe={item.recipe}
              id={item.recipe}
              count={getCount(item.recipe.toLowerCase())}
            />
          );
        })}
      </div>
    </div>
  );
}

export default PopularCategory;
