import React from "react";

const ContactUs = () => {
  return (
    <div className="min-h-screen bg-slate-50 px-6 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Contact Us</h1>

        <form className="bg-white shadow-md rounded-2xl p-6">
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Name</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-400"
              placeholder="Your name"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-400"
              placeholder="Your email"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Message</label>
            <textarea
              rows="4"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-400"
              placeholder="Write your message..."
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-slate-700 text-white py-2 rounded-lg hover:bg-slate-800 transition"
          >
            Send Message
          </button>
        </form>

        <div className="mt-8 text-center text-gray-600">
          <p>Email: <span className="font-medium">ghoroastore@gmail.com</span></p>
          <p>Phone: <span className="font-medium">033-98654422</span></p>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
