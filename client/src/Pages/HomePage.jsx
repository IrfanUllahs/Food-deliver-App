import React from "react";
import { useEffect, useState } from "react";
import Hero from "../components/Hero";
import PopularCategory from "../components/PopularCategory";
import Testimonial from "../components/Testimonial";
import StoryServices from "../components/Story&Services";
import SpecialDisches from "../components/SpecialDisches";
import { useSelector } from "react-redux";
import image1 from "../assets/category/img1.png";
import image2 from "../assets/category/img2.png";
import image3 from "../assets/category/img3.png";
import image4 from "../assets/category/img4.png";

function HomePage() {
  const popularData = [
    {
      id: 1,
      recipe: "Burger",
      image: image1,
    },
    {
      id: 2,
      recipe: "Chicken",
      image: image2,
    },
    {
      id: 3,
      recipe: "Dessert",
      image: image3,
    },
    {
      id: 4,
      recipe: "Drink",
      image: image4,
    },
  ];
  const user = useSelector((state) => state?.auth?.user);

  const [data, setdata] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      let result = await fetch("../../public/Menu.json");
      let data = await result.json();
      setdata(data.filter((item) => item.category === "popular"));
    };
    fetchData();
  }, []);

  return (
    <div>
      <Hero />
      <PopularCategory popularData={popularData} />
      <SpecialDisches data={data} />
      <Testimonial />
      <StoryServices />
    </div>
  );
}

export default HomePage;
