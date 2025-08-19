import React from "react";

const GiftCard = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">Gift Cards</h1>
      <p className="mb-4 text-gray-700">
        Looking for the perfect gift? Our Gift Cards are the easiest way to
        surprise your loved ones. They can use it to shop for anything they
        like on our platform.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2 text-gray-800">
        Why Choose Our Gift Cards?
      </h2>
      <ul className="list-disc pl-6 text-gray-700 space-y-2">
        <li>Instant delivery via email.</li>
        <li>Can be used across all categories.</li>
        <li>Multiple denominations available.</li>
        <li>No hidden fees or expiration date.</li>
      </ul>

      <div className="mt-8">
        <button className="bg-green-600 text-white px-6 py-3 rounded-lg shadow hover:bg-green-700">
          Buy a Gift Card
        </button>
      </div>
    </div>
  );
};

export default GiftCard;
