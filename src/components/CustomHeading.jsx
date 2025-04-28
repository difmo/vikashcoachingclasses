import React from "react";

const CustomHeading = ({ text1, text2 }) => {
  return (
    <h2 className="my-4 text-4xl tracking-tight bg-[#dba577] font-extrabold ">
      <span className="text-[#51087E] ">{text1}</span>
      <span className="text-[#51087E] ">{text2}</span>
    </h2>
  );
  //
};

export default CustomHeading;
