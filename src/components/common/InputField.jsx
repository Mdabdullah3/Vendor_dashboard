import React from "react";

const InputField = ({
  label,
  id,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
}) => {
  return (
    <div className="w-full">
      <label htmlFor={id} className="block text-gray-600 font-medium mb-1">
        {label} <span className="text-primary">{label && required && "*"}</span>
      </label>
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className="input input-bordered w-full py-2 bg-transparent focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
        required={required}
        placeholder={placeholder}
      />
    </div>
  );
};

export default InputField;
