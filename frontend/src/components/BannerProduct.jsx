import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import image1 from "../assets/banner/img1.webp";
import image2 from "../assets/banner/img2.webp";
import image3 from "../assets/banner/img3.jpg";
import image4 from "../assets/banner/img4.jpg";
import image5 from "../assets/banner/img5.webp";

import image1Mobile from "../assets/banner/img1_mobile.jpg";
import image2Mobile from "../assets/banner/img2_mobile.webp";
import image3Mobile from "../assets/banner/img3_mobile.jpg";
import image4Mobile from "../assets/banner/img4_mobile.jpg";
import image5Mobile from "../assets/banner/img5_mobile.png";

import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";

const BannerProduct = () => {
  const [currentImage, setCurrentImage] = useState(0);

  const desktopImages = [
    { src: image1, category: "airpodes" },
    { src: image2, category: "mobiles" },
    { src: image3, category: "watches" },
    { src: image4, category: "refrigerator" },
    { src: image5, category: "watches" },
  ];

  const mobileImages = [
    { src: image1Mobile, category: "airpodes" },
    { src: image2Mobile, category: "mobiles" },
    { src: image3Mobile, category: "watches" },
    { src: image4Mobile, category: "refrigerator" },
    { src: image5Mobile, category: "watches" },
  ];

  const nextImage = () => {
    setCurrentImage((prev) =>
      prev === desktopImages.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImage((prev) =>
      prev === 0 ? desktopImages.length - 1 : prev - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(nextImage, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container mx-auto px-4 rounded">
      <div className="h-56 md:h-72 w-full bg-slate-200 relative overflow-hidden rounded-lg">
        {/* ✅ Navigation arrows */}
        <div className="absolute z-20 inset-0 hidden md:flex items-center justify-between px-2 pointer-events-none">
          <button
            onClick={prevImage}
            className="bg-white shadow-md rounded-full p-2 text-2xl pointer-events-auto"
          >
            <FaAngleLeft />
          </button>
          <button
            onClick={nextImage}
            className="bg-white shadow-md rounded-full p-2 text-2xl pointer-events-auto"
          >
            <FaAngleRight />
          </button>
        </div>

        {/* ✅ Desktop Banner */}
        <Link
          to={`/product-category/${desktopImages[currentImage].category}`}
          className="hidden md:block w-full h-full"
        >
          <img
            src={desktopImages[currentImage].src}
            alt={desktopImages[currentImage].category}
            className="w-full h-full object-cover"
          />
        </Link>

        {/* ✅ Mobile Banner */}
        <Link
          to={`/product-category/${mobileImages[currentImage].category}`}
          className="block md:hidden w-full h-full"
        >
          <img
            src={mobileImages[currentImage].src}
            alt={mobileImages[currentImage].category}
            className="w-full h-full object-cover"
          />
        </Link>
      </div>
    </div>
  );
};

export default BannerProduct;
