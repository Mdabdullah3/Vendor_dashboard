import React from "react";

const InputToggle = ({ label, value, onChange }) => {
  return (
    <div className="flex items-center gap-2">
      <label htmlFor={label}>{label}</label>
      <input
        type="checkbox"
        className="toggle toggle-primary toggle-sm"
        onChange={onChange}
        value={value}
        id={label}
        checked={value}
      />
    </div>
  );
};

export default InputToggle;
