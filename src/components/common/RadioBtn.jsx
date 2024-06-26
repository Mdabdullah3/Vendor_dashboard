import React from "react";

const RadioBtn = ({ label, value, onChange }) => {
  return (
    <div>
      <label htmlFor={label} className="flex items-center gap-1">
        <input
          type="radio"
          id={label}
          name="radio-1"
          className="radio radio-sm"
          value={value}
          onChange={onChange}
        />
        {label}
      </label>
    </div>
  );
};

export default RadioBtn;
