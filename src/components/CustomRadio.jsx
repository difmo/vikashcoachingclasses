import React from "react";

const CustomRadio = ({
  label = "",
  id,
  name,
  value,
  checked,
  onChange,
  error,
  style,
}) => {
  const mainLabel = label ? label.split("*")[0] : "";

  return (
    <div className="relative py-1">
      <label
        htmlFor={id}
        className="flex items-center gap-1 cursor-pointer text-md text-gray-600"
        style={style}
      >
        <input
          type="radio"
          id={id}
          name={name}
          value={value}
          checked={checked}
          onChange={onChange}
          className="peer hidden"
        />
        <div className="w-5 h-5 rounded-full border-2 border-gray-300 peer-checked:border-[#b601fe] flex items-center justify-center transition-all duration-200">
          {checked && (
            <div className="w-2.5 h-2.5 bg-yellow-500 rounded-full" />
          )}
        </div>
        <span>
          {mainLabel}
          {label.includes("*") && <span className="text-red-500">*</span>}
        </span>
      </label>
      {error && <p className="mt-1 text-xs italic text-red-500">{error}</p>}
    </div>
  );
};

export default CustomRadio;
