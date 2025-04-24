import React from "react";
import RingLoader from "react-spinners/RingLoader";

const CustomLoader = () => {
  return (
    <div className="h-[400px] flex justify-center items-center">
      <RingLoader color="#00a6f4" size={100} />
    </div>
  );
};

export default CustomLoader;
