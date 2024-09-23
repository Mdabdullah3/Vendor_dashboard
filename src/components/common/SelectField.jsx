import React, { useState } from "react";
import InputField from "./InputField";

const SelectField = ({
  label,
  id,
  name,
  value,
  onChange,
  options,
  placeholder,
  required = false,
}) => {
  const [isCustom, setIsCustom] = useState(false);
  const [customValue, setCustomValue] = useState(value || "");

  const handleSelectChange = (e) => {
    const selectedValue = e.target.value;
    if (selectedValue === "custom") {
      setIsCustom(true);
    } else {
      setIsCustom(false);
      onChange({ target: { name, value: selectedValue } });
    }
  };

  const handleCustomChange = (e) => {
    const newValue = e.target.value;
    setCustomValue(newValue);
    onChange({ target: { name, value: newValue } });
  };

  return (
    <div>
      <label
        htmlFor={id}
        className="block text-gray-600 font-semibold tracking-wider"
      >
        {label} <span className="text-red-500">{label && required && "*"}</span>
      </label>
      <div className="relative">
        <select
          className="select select-bordered my-2 tracking-wider w-full focus:outline-none bg-transparent text-[16px] capitalize"
          id={id}
          name={name}
          value={isCustom ? "custom" : value}
          onChange={handleSelectChange}
          required={required}
        >
          <option className="bg-transparent w-full capitalize" value="">
            {placeholder || "Select an option"}
          </option>
          {options.map((option) => (
            <option
              className="bg-transparent w-full capitalize"
              key={option.value}
              value={option.value}
            >
              {option.label}
            </option>
          ))}
          <option className="bg-transparent w-full capitalize" value="custom">
            {`Other (${placeholder})`}
          </option>
        </select>
        {isCustom && (
          <div>
            <InputField
              onChange={handleCustomChange}
              placeholder={placeholder}
              value={customValue}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectField;
