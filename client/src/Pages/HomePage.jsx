import React from "react";
import { useEffect, useState } from "react";
import Hero from "../components/Hero";
import PopularCategory from "../components/PopularCategory";
import Testimonial from "../components/Testimonial";
import StoryServices from "../components/Story&Services";
import SpecialDisches from "../components/SpecialDisches";
import { useSelector } from "react-redux";
import { json } from "react-router-dom";
function HomePage() {
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
      <PopularCategory />
      <SpecialDisches data={data} />
      <Testimonial />
      <StoryServices />
    </div>
  );
}

export default HomePage;
