import React from "react";

const CancellationReturns = () => {
  return (
    <div className="min-h-screen bg-slate-50 px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Cancellation & Returns
        </h1>

        <p className="text-gray-600 text-lg mb-6">
          We want you to have a smooth shopping experience with us. Below are
          the details of our cancellation and return policy:
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">
          Order Cancellation
        </h2>
        <p className="text-gray-600 mb-4">
          Orders can be cancelled before they are shipped. Once your order has
          been dispatched, it cannot be cancelled.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">
          Returns
        </h2>
        <p className="text-gray-600 mb-4">
          You may request a return within <span className="font-medium">7 days</span> 
          of receiving your order, provided that the item is unused, in original
          packaging, and accompanied by proof of purchase.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">
          Refunds
        </h2>
        <p className="text-gray-600 mb-4">
          Once we receive your returned item and verify its condition, a refund
          will be processed to your original payment method within{" "}
          <span className="font-medium">5–7 business days</span>.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">
          Non-Returnable Items
        </h2>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li>Items marked as “non-returnable” on the product page</li>
          <li>Used or damaged products</li>
          <li>Personal care & hygiene items (for safety reasons)</li>
        </ul>

        <p className="text-gray-600 mt-6">
          For assistance with cancellations or returns, please contact our
          support team at{" "}
          <span className="font-medium">ghoroastore@gmail.com</span>.
        </p>
      </div>
    </div>
  );
};

export default CancellationReturns;
