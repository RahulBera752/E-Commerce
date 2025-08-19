import React from "react";
import logoImage from "../assets/MyWebLogo.png";

const Logo = ({ w = 500, h = 200 }) => {
  return (
    <div className="flex items-center justify-center">
      <img
        src={logoImage}
        alt="GhoroaStore Logo"
        style={{ width: `${w}px`, height: `${h}px` }}
        className="object-contain"
      />
    </div>
  );
};

export default Logo;
