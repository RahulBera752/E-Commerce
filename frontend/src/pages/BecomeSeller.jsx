import React from "react";

const BecomeSeller = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">
        Become a Seller
      </h1>
      <p className="mb-4 text-gray-700">
        Join our platform and start selling your products to thousands of
        customers across India. Whether you are an individual entrepreneur or a
        large business, we provide the tools and support you need to grow your
        business online.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2 text-gray-800">
        Why Sell With Us?
      </h2>
      <ul className="list-disc pl-6 text-gray-700 space-y-2">
        <li>Reach a wide customer base across India.</li>
        <li>Easy product listing and management.</li>
        <li>Secure and fast payments.</li>
        <li>24/7 seller support.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-2 text-gray-800">
        How to Get Started
      </h2>
      <ol className="list-decimal pl-6 text-gray-700 space-y-2">
        <li>Click on the “Register Now” button below.</li>
        <li>Fill out your business and product details.</li>
        <li>Upload necessary documents for verification.</li>
        <li>Start listing your products and selling!</li>
      </ol>

      <div className="mt-8">
        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700">
          Register Now
        </button>
      </div>
    </div>
  );
};

export default BecomeSeller;
