import React from "react";

const StudentCheckbox = ({
  label = "",
  id,
  checked,
  onChange,
  error,
  style,
  groupName,
}) => {
  const mainLabel = label ? label.split("*")[0] : "";

  return (
    <div className="relative py-1">
      <label
        htmlFor={id}
        className="flex items-center gap-2 cursor-pointer text-md text-primary"
        style={style}
      >
        <input
          type="radio" 
          id={id}
          checked={checked}
          onChange={onChange}
          className="peer hidden"
          name={groupName} 
        />
        <div className="w-4 h-4 border-2 border-gray-300 rounded-full peer-checked:bg-yellow-500 peer-checked:border-blue-600 flex items-center justify-center transition-all duration-200">
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
          {label.includes("*") && <span className="text-red-500">*</span>}
        </span>
      </label>
      {error && <p className="mt-1 text-xs italic text-red-500">{error}</p>}
    </div>
  );
};

export default StudentCheckbox;
