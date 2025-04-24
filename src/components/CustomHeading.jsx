import React from "react";

const CustomHeading = ({ text1, text2 }) => {
  return (
    <h2 className="my-4 text-4xl tracking-tight font-extrabold ">
      <span className="text-black">{text1}</span>
      <span className="text-sky-500">{text2}</span>
    </h2>
  );
  // 
};

export default CustomHeading;
