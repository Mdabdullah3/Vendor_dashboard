import React, { useState } from "react";

const InputSearch = ({ placeholder, value, onChange, onSearch, width }) => {
  const [inputValue, setInputValue] = useState(value || "");

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && onSearch) {
      onSearch(inputValue);
    }
  };

  return (
    <div>
      <label className="input input-bordered flex items-center gap-2 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40">
        <input
          type="text"
          className="grow "
          placeholder={placeholder}
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="w-4 h-4 opacity-70"
        >
          <path
            fillRule="evenodd"
            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
            clipRule="evenodd"
          />
        </svg>
      </label>
    </div>
  );
};

export default InputSearch;
