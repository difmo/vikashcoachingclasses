import React from "react";

const CustomButton = ({
  label,
  onClick,
  type = "button", ///// ✅ accept type from props
  className = "",
}) => {
  return (
    <button
      onClick={onClick}
      type={type} // ✅ apply dynamic type
      className={`text-white bg-gradient-to-r w-full  from-blue-400 via-blue-500 to-blue-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 text-lg font-medium rounded-lg px-5 py-2.5 text-center ${className}`}
    >
      {label}
    </button>
  );
};

export default CustomButton;
