import React, { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";

const CustomDropdown = ({
  selectOption = [],
  selectedValue,
  onSelect,
  className = "",
  label = "",
  required = false,
  error = "",
  setError,
  onBlur,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [touched, setTouched] = useState(false);
  const dropdownRef = useRef(null);

  const mainLabel = label ? label.split("*")[0] : "";

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (required && touched && !selectedValue) {
      setError?.("This field is required");
    } else {
      setError?.("");
    }
  }, [selectedValue, touched, required, setError]);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (option) => {
    onSelect(option);
    setIsOpen(false);
    setTouched(true);
  };

  const handleBlur = () => {
    setTouched(true);
    onBlur?.();
  };

  return (
    <div className={`relative w-full pb-4 ${className}`} ref={dropdownRef}>
      {label && (
        <label className="block text-md text-primary mb-1">
          {mainLabel}
          {label.includes("*") || required ? (
            <span className="text-red-500">*</span>
          ) : null}
        </label>
      )}
      <button
        type="button"
        onClick={toggleDropdown}
        onBlur={handleBlur}
        className={`w-full px-3 py-2.5 border ${
          error ? "border-red-500" : "border-gray-300"
        } rounded-md bg-white text-black flex justify-between items-center`}
      >
        <span className={selectedValue ? "" : "text-gray-600"}>
          {selectedValue || "Select Level"}
        </span>
        <ChevronDown
          className={`ml-2 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="absolute w-full mt-2 bg-white border border-gray-300 rounded-md shadow-lg z-10 max-h-60 overflow-auto">
          {selectOption.map((option) => (
            <div
              key={option}
              onClick={() => handleSelect(option)}
              className="px-3 py-1 hover:bg-blue-100 cursor-pointer text-black"
            >
              {option}
            </div>
          ))}
        </div>
      )}

      {touched && error && (
        <p className="mt-1 text-xs italic text-red-500">{error}</p>
      )}
    </div>
  );
};

export default CustomDropdown;
