import React from "react";
import img from "../assets/tutr.jpg";
const ContentLayout = () => {
  return (
    <div className="">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto space-y-10">
          {/* Section 1: Content left, Pic right */}
          <div className="flex flex-col md:flex-row items-start gap-6">
            <div className="flex-1">
              <h2 className="text-xl font-bold py-2">Content:</h2>
              <p className="text-gray-700">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
                venenatis, lorem a sollicitudin posuere, nulla nisi pharetra
                nisi, eget dignissim lorem est nec risus.
              </p>
            </div>
            <div className="w-full md:w-1/3">
              <div className=" flex items-center justify-center rounded-xl">
                <img src={img} />
              </div>
            </div>
          </div>

          {/* Section 2: Pic left, Content right */}
          <div className="flex flex-col md:flex-row items-start gap-6">
            <div className="w-full md:w-1/3">
              <div className=" flex items-center justify-center rounded-xl">
                <img src={img} />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold mb-2">Content:</h2>
              <p className="text-gray-700">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
                venenatis, lorem a sollicitudin posuere, nulla nisi pharetra
                nisi, eget dignissim lorem est nec risus.
              </p>
            </div>
          </div>

          {/* Section 3: Pic left, Content right */}
          <div className="flex flex-col md:flex-row items-start gap-6">
            <div className="flex-1">
              <h2 className="text-xl font-bold mb-2">Content:</h2>
              <p className="text-gray-700">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
                venenatis, lorem a sollicitudin posuere, nulla nisi pharetra
                nisi, eget dignissim lorem est nec risus.
              </p>
            </div>
            <div className="w-full md:w-1/3">
              <div className="flex items-center justify-center rounded-xl">
                <img src={img} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentLayout;
