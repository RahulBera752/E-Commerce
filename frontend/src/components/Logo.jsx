import React from "react";

const Logo = ({ w = 90, h = 50 }) => {
  return (
    <div
      style={{ width: `${w}px`, height: `${h}px` }}
      className="flex items-center justify-center font-bold text-skyblue-600 text-2xl"
    >
    𝕽𝖆𝖍𝖚𝖑
    </div>
  );
};

export default Logo;
