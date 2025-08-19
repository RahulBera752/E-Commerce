import React from "react";

const Advertise = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">
        Advertise With Us
      </h1>
      <p className="mb-4 text-gray-700">
        Reach millions of potential customers by advertising your brand on our
        platform. We offer a variety of advertising solutions to help your
        business grow.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2 text-gray-800">
        Advertising Benefits
      </h2>
      <ul className="list-disc pl-6 text-gray-700 space-y-2">
        <li>Targeted reach to relevant customers.</li>
        <li>Boost brand visibility and awareness.</li>
        <li>Flexible ad placements and budgets.</li>
        <li>Dedicated support for advertisers.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-2 text-gray-800">
        Get Started
      </h2>
      <p className="mb-4 text-gray-700">
        Interested in advertising with us? Click the button below to contact our
        advertising team and explore opportunities.
      </p>

      <div className="mt-8">
        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700">
          Contact Us
        </button>
      </div>
    </div>
  );
};

export default Advertise;
