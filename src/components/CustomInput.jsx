const CustomInput = ({
  style,
  placeholder,
  label = "", // default to an empty string if undefined
  id,
  type,
  onChange,
  value,
  error,
}) => {
  // Safelyit the label only if it's a string and not empty.
  const mainLabel = label ? label.split("*")[0] : "";

  return (
    <div className="relative mb-2 py-1.5">
      {label && (
        <label
          className="block mb-2 text-md font-semibold text-primary transition-all duration-300 ease-in-out"
          htmlFor={id}
        >
          {mainLabel}
          {label.includes("*") && <span className="text-red-500">*</span>}
        </label>
      )}
      <input
        className="appearance-none border-2 bg-white border-gray-300 w-full py-2.5 px-2 text-black leading-tight focus:outline-none focus:ring-1 focus:ring-primary-orange focus:border-primary-orange transition-all duration-300 ease-in-out rounded-md"
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        style={style}
      />
      {error && <p className="mt-1 text-xs italic text-red-500">{error}</p>}
    </div>
  );
};

export default CustomInput;
