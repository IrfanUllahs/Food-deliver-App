import React from "react";

const Services = () => {
  return (
    <div className="services-section py-10">
      <h2 className="text-3xl font-bold text-center mb-6">Our Services</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="service-card p-4 bg-white shadow-md rounded-md">
          <h3 className="text-xl font-semibold mb-2">Wide Range of Cuisines</h3>
          <p>Enjoy a variety of cuisines from top restaurants in your area.</p>
        </div>
        <div className="service-card p-4 bg-white shadow-md rounded-md">
          <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
          <p>
            Get your food delivered to your doorstep quickly and efficiently.
          </p>
        </div>
        <div className="service-card p-4 bg-white shadow-md rounded-md">
          <h3 className="text-xl font-semibold mb-2">Real-Time Tracking</h3>
          <p>Track your order in real-time from the restaurant to your door.</p>
        </div>
        <div className="service-card p-4 bg-white shadow-md rounded-md">
          <h3 className="text-xl font-semibold mb-2">
            Special Deals and Discounts
          </h3>
          <p>
            Save more with our exclusive deals, discounts, and loyalty programs.
          </p>
        </div>
        <div className="service-card p-4 bg-white shadow-md rounded-md">
          <h3 className="text-xl font-semibold mb-2">Contactless Delivery</h3>
          <p>
            Opt for contactless delivery for a safer and more convenient
            experience.
          </p>
        </div>
        <div className="service-card p-4 bg-white shadow-md rounded-md">
          <h3 className="text-xl font-semibold mb-2">Easy Payment Options</h3>
          <p>
            Pay with your preferred method, including cards, mobile payments,
            and cash.
          </p>
        </div>
        {/* Add more service cards as needed */}
      </div>
    </div>
  );
};

export default Services;
