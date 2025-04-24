import React from "react";
import { useParams } from "react-router-dom";
import { physics, chemistry, math, biology } from "../data/AllData";

const dataMap = {
  physics,
  chemistry,
  math,
  biology,
};

const ContentLayout = () => {
  const { subject } = useParams();
  const selectedData = dataMap[subject];

  if (!selectedData) {
    return (
      <div className="text-center text-red-500 mt-10">Subject not found</div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {selectedData.map((item, index) => {
          const isEven = index % 2 === 0;

          return (
            <div
              key={index}
              className={`flex flex-col ${
                isEven ? "md:flex-row" : "md:flex-row-reverse"
              } items-center gap-8`}
            >
              <div className="flex-1">
                <h2 className="text-xl font-bold mb-4">{item.title}</h2>
                {item.descraption.map((text, idx) => (
                  <p
                    key={idx}
                    className="text-gray-700 text-base md:text-lg mb-2"
                  >
                    {text}
                  </p>
                ))}
              </div>
              <div className="w-full md:w-1/3">
                <div className="flex items-center justify-center rounded-xl overflow-hidden">
                  <img
                    src={item.src}
                    alt={item.title}
                    className="w-full h-auto max-w-full rounded-xl"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ContentLayout;
