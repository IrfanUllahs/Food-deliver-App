import React from "react";
import ServicesCard from "./ServicesCard";
import image1 from "../assets/serives/fi-rr-gift.png";
import image2 from "../assets/serives/fi-rr-salad.png";
import image3 from "../assets/serives/fi-rr-shopping-cart-check.png";
import image4 from "../assets/serives/fi-rr-time-fast.png";
import { Link } from "react-router-dom";
function StoryServices() {
  return (
    <div className="flex mt-28 px-2 lg:flex-row flex-col gap-4">
      <div className="flex-1 font-inter flex flex-col gap-8 justify-center ">
        <p className="text-xl font-bold text-[#FF6868] font-inter">
          Our Story & Services
        </p>
        <h1 className="lg:text-[45px] custmd:[40px] sm:text-[30px] text-[25px] font-bold">
          Our Culinary Journey And Services
        </h1>
        <p className="text-[16px] font-medium text-secondary ">
          Rooted in passion, we curate unforgettable dining experiences and
          offer exceptional services, blending culinary artistry with warm
          hospitality.
        </p>
        <Link to="/menu">
          <button className="button shadow-lg shadow-green-200 !px-6 ">
            Explore
          </button>
        </Link>
      </div>
      <div className="flex-1   grid gap-16 sm:grid-cols-2 grid-cols-1 px-5 py-4">
        <ServicesCard
          image={image1}
          title="CATERING"
          desc="Delight your guests with our flavors and  presentations."
        />
        <ServicesCard
          image={image2}
          title="CATERING"
          desc="Delight your guests with our flavors and  presentations."
        />
        <ServicesCard
          image={image3}
          title="CATERING"
          desc="Delight your guests with our flavors and  presentations."
        />
        <ServicesCard
          image={image4}
          title="CATERING"
          desc="Delight your guests with our flavors and  presentations."
        />
      </div>
    </div>
  );
}

export default StoryServices;
