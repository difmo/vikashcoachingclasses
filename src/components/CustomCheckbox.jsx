import React, { useState, useEffect } from "react";

const CustomCheckbox = ({
  label = "",
  id,
  checked,
  onChange,
  error,
  setError,
  required = false,
  style,
  onBlur,
}) => {
  const [touched, setTouched] = useState(false);
  const mainLabel = label ? label.split("*")[0] : "";

  useEffect(() => {
    if (required && touched && !checked) {
      setError?.("This field is required");
    } else {
      setError?.("");
    }
  }, [checked, touched, required, setError]);

  const handleBlur = (e) => {
    setTouched(true);
    onBlur?.(e);
  };

  return (
    <div className="relative py-1">
      <label
        htmlFor={id}
        className="flex items-center gap-2 cursor-pointer text-md text-primary"
        style={style}
      >
        <input
          type="checkbox"
          id={id}
          checked={checked}
          onChange={(e) => {
            onChange(e);
            setTouched(true);
          }}
          onBlur={handleBlur}
          className="peer hidden"
        />
        <div className="w-4 h-4 border-2 border-gray-300 rounded-md peer-checked:bg-yellow-500 peer-checked:border-[#b601fe] flex items-center justify-center transition-all duration-200">
          {checked && (
            <svg
              className="w-3 h-3 text-primary"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          )}
        </div>
        <span>
          {mainLabel}
          {label.includes("*") || required ? (
            <span className="text-red-500">*</span>
          ) : null}
        </span>
      </label>
      {touched && error && (
        <p className="mt-1 text-xs italic text-red-500">{error}</p>
      )}
    </div>
  );
};

export default CustomCheckbox;
