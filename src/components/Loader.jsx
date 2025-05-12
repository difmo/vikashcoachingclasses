// components/Loader.jsx
import React from "react";

const Loader = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="relative w-24 h-24">
            <div className="absolute inset-0 border-4 border-t-4 border-t-[#dba577] border-gray-200 rounded-full animate-spin"></div>
            <div className="absolute inset-2 border-4 border-t-4 border-t-[#c08c5c] border-gray-300 rounded-full animate-spin animation-delay-150"></div>
            <div className="absolute inset-4 border-4 border-t-4 border-t-[#dba577] border-gray-400 rounded-full animate-spin animation-delay-300"></div>
          </div>
        </div>
  );
};

export default Loader;
