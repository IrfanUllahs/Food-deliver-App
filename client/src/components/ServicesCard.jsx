import React from "react";

function ServicesCard({ image, title, desc }) {
  return (
    <div className="shadow-[0px_-1px_29px_9px_#00000024] rounded-xl p-8 flex flex-col items-center text-primary gap-5 ">
      <div>
        <img src={image} alt="" />
      </div>
      <h1 className="text-2xl font-bold">{title}</h1>
      <p className="text-center">{desc}</p>
    </div>
  );
}

export default ServicesCard;
