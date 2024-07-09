import React from "react";

const PrimaryButton = ({ value, onClick, disabled, loading }) => {
  return (
    <div>
      <button
        onClick={onClick}
        className={`bg-primary hover:bg-primary/70  text-white font-bold py-3 px-4 rounded-lg w-full transition duration-300 ${
          disabled ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {value}
      </button>
    </div>
  );
};

export default PrimaryButton;
