import React from "react";

const RadioBtn = ({ label, value, onChange }) => {
  return (
    <div>
      <label htmlFor={label}>
        <input
          type="radio"
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
