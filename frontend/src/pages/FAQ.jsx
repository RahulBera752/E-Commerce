import React from "react";

const FAQ = () => {
  const faqs = [
    { q: "How can I track my order?", a: "You can track your order from your account dashboard under 'My Orders'." },
    { q: "What is the return policy?", a: "You can return products within 7 days of delivery if they are unused and in original condition." },
    { q: "Do you offer Cash on Delivery (COD)?", a: "Yes, COD is available on selected products." },
  ];

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Frequently Asked Questions</h1>
        <div className="space-y-4">
          {faqs.map((item, idx) => (
            <div key={idx} className="bg-white shadow-md rounded-xl p-4">
              <h3 className="font-semibold text-gray-800">{item.q}</h3>
              <p className="text-gray-600 mt-2">{item.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
