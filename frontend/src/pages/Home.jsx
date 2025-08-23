import React from "react";
import CategoryList from "../components/CategoryList";
import BannerProduct from "../components/BannerProduct";
import VerticalCardProduct from "../components/VerticalCardProduct";
import HorizontalCardProduct from "../components/HorizontalCardProduct";

const Home = () => {
  return (
    <div>
      <CategoryList />
      <BannerProduct />

      {/* ✅ Horizontal carousel layout for top categories */}
      <HorizontalCardProduct category="airpodes" heading="Top's Airpodes" />
      <HorizontalCardProduct category="watches" heading="Popular's Watches" />

      {/* ✅ Grid layout for the rest */}
      <VerticalCardProduct category="mobiles" heading="Mobiles" />
      <VerticalCardProduct category="mouse" heading="Mouse" />
      <VerticalCardProduct category="televisions" heading="Televisions" />
      <VerticalCardProduct category="camera" heading="Camera & Photography" />
      <VerticalCardProduct category="earphones" heading="Earphones" />
      <VerticalCardProduct category="speakers" heading="Bluetooth Speakers" />
      <VerticalCardProduct category="refrigerator" heading="Refrigerator" />
      <VerticalCardProduct category="trimmers" heading="Trimmers" />
    </div>
  );
};

export default Home;
