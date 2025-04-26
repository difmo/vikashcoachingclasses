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
      className={`text-primary hover:bg-primary bg-secondary text-lg font-medium rounded-lg px-8 py-2 text-center ${className}`}
    >
      {label}
    </button>
  );
};

export default CustomButton;
