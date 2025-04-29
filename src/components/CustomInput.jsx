import React from "react";

const CustomInput = ({
  style,
  placeholder,
  label = "", // default to an empty string if undefined
  id,
  type = "text", // default to "text" if not provided
  name, // required to map to the input field name for form handling
  onChange,
  value,
  error,
}) => {
  // Split the label to handle "*" for mandatory fields
  const mainLabel = label ? label.split("*")[0] : "";

  return (
    <div className="relative py-1.5">
      {/* Label for the input */}
      {label && (
        <label
          className="block mb-2 text-md font-semibold text-primary transition-all duration-300 ease-in-out"
          htmlFor={id}
        >
          {mainLabel}
          {label.includes("*") && <span className="text-red-500">*</span>}
        </label>
      )}
      {/* Input Field */}
      <input
        className="appearance-none border-2 bg-white border-gray-300 w-full py-2.5 px-2 text-black leading-tight focus:outline-none focus:ring-1 focus:ring-primary-orange focus:border-primary-orange transition-all duration-300 ease-in-out rounded-md"
        type={type} // Define the input type (text by default)
        name={name} // The name to be used for form submission
        id={id} // Unique identifier for this input
        value={value} // Controlled value for input
        onChange={onChange} // Input change handler
        placeholder={placeholder} // Placeholder text
        style={style} // Custom styles (if any)
      />
      {/* Error Message */}
      {error && <p className="mt-1 text-xs italic text-red-500">{error}</p>}
    </div>
  );
};

// Export the component to make it available for other files
export default CustomInput;
