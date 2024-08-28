import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const InputField = ({
  label,
  id,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
  error = "",
  showPassword = false,
  toggleShowPassword = null,
}) => {
  return (
    <div className="w-full relative">
      <label htmlFor={id} className="block text-gray-600 font-semibold mb-1">
        {label} <span className="text-primary">{required && label && "*"}</span>
      </label>
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className={`input input-bordered w-full py-2 bg-transparent focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 ${
          error ? "border-red-500" : ""
        }`}
        required={required}
        placeholder={placeholder}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      {toggleShowPassword && (
        <div className="absolute top-[45px] right-0 flex items-center pr-3">
          {showPassword ? (
            <AiOutlineEye
              onClick={toggleShowPassword}
              className="cursor-pointer"
            />
          ) : (
            <AiOutlineEyeInvisible
              onClick={toggleShowPassword}
              className="cursor-pointer"
            />
          )}
        </div>
      )}
    </div>
  );
};

export default InputField;
