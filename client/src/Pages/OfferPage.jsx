import React from "react";

const OffersPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg mx-auto">
        <div className="text-center">
          <svg
            className="w-24 h-24 text-gray-400 mx-auto"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          <h1 className="text-2xl font-bold text-gray-800 mt-4">
            No Offers Recently
          </h1>
          <p className="text-gray-600 mt-2">
            It looks like there are no special offers available at the moment.
            Please check back later for updates!
          </p>
        </div>
        <div className="mt-6 text-center">
          <a
            href="/"
            className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-300"
          >
            Go Back to Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default OffersPage;
