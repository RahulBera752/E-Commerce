import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-slate-50 px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Privacy Policy
        </h1>
        <p className="text-gray-600 text-lg mb-4">
          Your privacy is important to us. This policy explains how we collect,
          use, and protect your personal information.
        </p>
        <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">
          Information We Collect
        </h2>
        <p className="text-gray-600 mb-4">
          We may collect your name, email, phone number, shipping address, and
          payment details when you shop with us.
        </p>
        <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">
          How We Use Your Information
        </h2>
        <p className="text-gray-600 mb-4">
          Your information is used to process orders, provide customer support,
          improve our services, and send you relevant updates.
        </p>
        <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">
          Data Protection
        </h2>
        <p className="text-gray-600">
          We implement strict security measures to protect your personal data.
          We do not sell or share your data with third parties without your
          consent.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
