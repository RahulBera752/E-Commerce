import React from "react";
import { useLocation, Link } from "react-router-dom";

const OrderSuccess = () => {
  const location = useLocation();
  const orderId = location?.state?.orderId;

  return (
    <div className="max-w-2xl mx-auto p-6 text-center">
      <h2 className="text-2xl font-bold text-green-600 mb-4">✅ Order Placed Successfully!</h2>
      {orderId ? (
        <>
          <p className="mb-2">Your order ID is:</p>
          <p className="font-mono text-lg text-gray-700 mb-4">{orderId}</p>
        </>
      ) : (
        <p className="text-red-600">Order ID not found in route state.</p>
      )}
      <Link to="/" className="text-blue-600 underline mt-4 inline-block">
        Go back to Home
      </Link>
    </div>
  );
};

export default OrderSuccess;
