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
      className={`text-[#51087E] hover:bg-primary bg-[#dba577] text-lg font-medium rounded-lg px-8 py-2 text-center ${className}`}
    >
      {label}
    </button>
  );
};

export default CustomButton;
