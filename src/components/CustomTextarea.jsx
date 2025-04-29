// src/components/CustomTextarea.jsx
import React from "react";

const CustomTextarea = ({ value, onChange, placeholder, rows = 4, className = "", ...rest }) => {
  return (
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      className={`w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-black bg-white ${className}`}
      {...rest}
    />
  );
};

export default CustomTextarea;
