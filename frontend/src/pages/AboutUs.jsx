import React from "react";
import MyWebLogo from "../assets/MyWebLogo.png";
import CEOImage from "../assets/ceo.jpeg";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* CEO Section */}
      <section className="px-6 py-12 bg-slate-50">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-8">
          {/* CEO Image */}
          <div className="flex-shrink-0">
            <img
              src={CEOImage}
              alt="CEO"
              className="w-40 h-40 rounded-full shadow-lg object-cover"
            />
          </div>

          {/* CEO Message */}
          <div>
            <h2 className="text-xl font-semibold">
              Rahul Bera,{" "}
              <span className="text-blue-600">
                Chief Executive Officer - GhoroaStore
              </span>
            </h2>
            <p className="mt-4 text-gray-700 leading-relaxed italic">
              “As a homegrown e-commerce organization, we direct our efforts
              towards building a sustainable business while creating inclusive
              and impactful growth for all our stakeholders. We believe in
              transformative innovation and risk-taking. We learn from our
              experiences and strive towards enhanced customer experiences while
              bridging the gap between communities and India with digital
              commerce.”
            </p>
          </div>
        </div>
      </section>

      {/* About Company Section */}
      <section className="px-6 py-16">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-10 items-start">
          {/* Text */}
          <div className="md:w-2/3">
            <h1 className="text-3xl font-bold mb-6">About GhoroaStore</h1>
            <p className="text-gray-700 mb-4 leading-relaxed">
              GhoroaStore is one of India’s fast-growing digital commerce
              platforms, offering a wide range of products at affordable prices.
              Started with a vision to make shopping easier and more accessible,
              GhoroaStore connects millions of customers with quality products
              across categories.
            </p>
            <p className="text-gray-700 mb-4 leading-relaxed">
              With thousands of trusted sellers and a growing customer base, we
              aim to empower local businesses while ensuring delightful shopping
              experiences. Our focus is on technology, innovation, and customer
              satisfaction.
            </p>
            <p className="text-gray-700 leading-relaxed">
              We are committed to delivering value, building trust, and creating
              opportunities for entrepreneurs and small businesses while making
              shopping simple, fast, and reliable for everyone.
            </p>
          </div>

          {/* Office / Logo Image */}
          <div className="md:w-1/3">
            <img
              src={MyWebLogo}
              alt="GhoroaStore Office"
              className="rounded-2xl shadow-lg"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;

