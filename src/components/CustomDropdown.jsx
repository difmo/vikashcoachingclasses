import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const CustomDropdown = ({ selectOption = [], selectedValue, onSelect, className = "" }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (option) => {
    onSelect(option);  // Notify parent of selection
    setIsOpen(false);   // Close the dropdown after selection
  };

  return (
    <div className={`relative w-full pb-4 ${className}`}>
      <button
        type="button"
        onClick={toggleDropdown}
        className="w-full p-3 border border-gray-300 rounded-md bg-white text-black flex justify-between items-center"
      >
        <span>{selectedValue || "Select Level"}</span> {/* Show selected value */}
        <ChevronDown
          className={`ml-2 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="absolute w-full mt-2 bg-white border border-gray-300 rounded-md shadow-lg z-10">
          {selectOption.map((option) => (
            <div
              key={option}
              onClick={() => handleSelect(option)}
              className="p-3 hover:bg-blue-100 cursor-pointer text-black"
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
