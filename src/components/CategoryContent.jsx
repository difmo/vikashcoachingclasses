import React from "react";

const CategoryContent = ({ imageLeft = false, heading, desc, image }) => {
  return (
    <div className="px-4 py-8">
      <h2 className="text-3xl mb-8 text-center md:text-left">
        {heading}
      </h2>

      <div
        className={`flex flex-col-reverse md:flex-row ${
          imageLeft ? "md:flex-row-reverse" : ""
        } gap-8 items-center`}
      >
        {/* Text Content */}
        <div className="md:w-1/2 w-full  h-96 overflow-hidden">
          <p className="text-xl leading-relaxed text-justify line-clamp-[12]">
            {desc}
          </p>
        </div>

        {/* Image Content */}
        <div className="md:w-1/2 w-full h-96">
          <img
            className="rounded-xl w-full h-full object-cover"
            src={image}
            alt="Category Visual"
          />
        </div>
      </div>
    </div>
  );
};

export default CategoryContent;
