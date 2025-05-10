import React, { useState, useEffect } from "react";

const CustomInput = ({
  style,
  placeholder,
  label = "",
  id,
  type = "text",
  name,
  onChange,
  value,
  error = "",
  setError,
  onBlur,
  required = false,
}) => {
  const [touched, setTouched] = useState(false);
  const mainLabel = label ? label.split("*")[0] : "";

  useEffect(() => {
    if (required && touched && !value) {
      setError?.("This field is required");
    } else {
      setError?.("");
    }
  }, [value, touched, required, setError]);

  const handleBlur = () => {
    setTouched(true);
    onBlur?.();
  };

  return (
    <div className="relative py-1.5">
      {/* Label */}
      {label && (
        <label
          htmlFor={id}
          className="block mb-2 text-md font-semibold text-primary transition-all duration-300 ease-in-out"
        >
          {mainLabel}
          {(label.includes("*") || required) && (
            <span className="text-red-500">*</span>
          )}
        </label>
      )}

      {/* Input Field */}
      <input
        className={`appearance-none border-2 w-full py-2.5 px-2 text-black rounded-md bg-white leading-tight transition-all duration-300 ease-in-out focus:outline-none focus:ring-1 focus:ring-primary-orange focus:border-primary-orange ${
          error ? "border-red-500" : "border-gray-300"
        }`}
        type={type}
        name={name}
        id={id}
        value={value}
        onChange={onChange}
        onBlur={handleBlur}
        placeholder={placeholder}
        style={style}
      />

      {/* Error Display */}
      {touched && error && (
        <p className="mt-1 text-xs italic text-red-500">{error}</p>
      )}
    </div>
  );
};

export default CustomInput;
