import React from "react";

const FAQ = () => {
  const faqs = [
    { q: "How can I track my order?", a: "You can track your order from your account dashboard under 'My Orders'." },
    { q: "What is the return policy?", a: "You can return products within 7 days of delivery if they are unused and in original condition." },
    { q: "Do you offer Cash on Delivery (COD)?", a: "Yes, COD is available on selected products." },

    // ✅ GhoroaStore FAQs
    { q: "Can I reactivate my inactive GhoroaStore account?", a: "Yes, you can reactivate it by logging in with your registered mobile number or email and verifying via OTP." },
    { q: "Do I need to verify my mobile number or email address every time I log in?", a: "Verification may be required occasionally for security, but not always." },
    { q: "What is an OTP or verification code?", a: "An OTP (One Time Password) is a temporary code sent to your mobile or email to verify your identity." },
    { q: "Why do I need to verify my mobile number or email address to log into my GhoroaStore account?", a: "Verification helps protect your account and ensures only you can access it." },
    { q: "Can I use an international number to sign up?", a: "Currently, GhoroaStore supports only Indian mobile numbers for signup." },
    { q: "How can I use my mobile number to login on the GhoroaStore mobile app?", a: "Simply enter your registered mobile number, and you'll receive an OTP for login." },
    { q: "I'm getting an error message that says, 'You've exceeded the maximum number of attempts to enter correct verification code'. How can I log in now?", a: "Wait a few minutes and try again, or use your email address to log in." },
    { q: "Can I use a corporate email ID to sign up?", a: "Yes, you can use a corporate email ID as long as you have access to it." },
    { q: "How can I add a new delivery address to my GhoroaStore account?", a: "Go to 'My Account' → 'Addresses' → 'Add New Address'." },
    { q: "What should I do if I don't get the OTP or verification code while logging in?", a: "Ensure your number/email is active, check spam folder, or request OTP again after a short while." },
    { q: "How can I change the email ID linked with my GhoroaStore account?", a: "Go to 'My Account' → 'Profile Information' → 'Edit Email'." },
    { q: "How can I deactivate my GhoroaStore account?", a: "You can request deactivation from 'My Account' → 'Settings' → 'Deactivate Account'." },
    { q: "What to do if I am unable to login via website?", a: "Clear cache/cookies, try another browser, or reset your password." },
    { q: "How to add GSTIN number to my GhoroaStore account?", a: "Go to 'My Account' → 'Business Details' → 'Add GSTIN'." },
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
