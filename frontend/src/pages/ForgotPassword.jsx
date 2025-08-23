import React, { useState } from "react";
import { toast } from "react-toastify";
import { SummaryApi } from "../common";
import forgetPassImg from "../assets/forgotpass.jpg"; // ✅ put your uploaded image here

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return toast.error("Please enter your email");

    const res = await fetch(SummaryApi.forgotPassword.url, {
      method: SummaryApi.forgotPassword.method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();
    if (data.success) toast.success("Reset link sent!");
    else toast.error(data.message || "Something went wrong");
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-black bg-opacity-90"
      style={{
        backgroundImage: `url(${forgetPassImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Forgot Password
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border px-4 py-2 rounded-lg focus:ring focus:ring-blue-400"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
          >
            Send Link
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
