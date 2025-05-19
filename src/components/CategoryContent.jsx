import React, { useState, useEffect, useRef } from "react";

const CategoryContent = ({ imageLeft = false, heading, desc, image }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef(null);

  // Handle clicks outside modal
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target)
      ) {
        setIsModalOpen(false);
      }
    };

    if (isModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalOpen]);

  return (
    <div className="px-4 py-8 relative">
      <h2 className="text-3xl mb-8 text-center md:text-left">
        {heading}
      </h2>

      <div
        className={`flex flex-col-reverse md:flex-row ${
          imageLeft ? "md:flex-row-reverse" : ""
        } gap-8 items-center`}
      >
        {/* Text Content */}
        <div className="md:w-1/2 w-full h-96 overflow-hidden relative">
          <p className="text-xl leading-relaxed text-justify line-clamp-[11]">
            {desc}
          </p>
          {/* Read More Button */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="mt-2 text-blue-600 underline hover:text-blue-800"
          >
            Read more
          </button>
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

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 transition duration-300">
          <div
            ref={modalRef}
            className="bg-white rounded-lg shadow-lg max-w-2xl w-full p-6 animate-fadeIn relative"
          >
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-4 text-gray-600 text-2xl hover:text-red-600"
            >
              &times;
            </button>
            <h3 className="text-xl font-semibold mb-4">{heading}</h3>
            <p className="text-base leading-relaxed text-justify">{desc}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryContent;
