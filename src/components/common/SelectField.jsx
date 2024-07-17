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
  return (
    <div className="">
      <label
        htmlFor={id}
        className="block text-gray-600 font-semibold  tracking-wider"
      >
        {label} <span className="text-red-500">{required && "*"}</span>
      </label>
      <select
        className="select select-bordered my-2 tracking-wider w-full focus:outline-none bg-transparent text-[16px]"
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
      >
        <option className=" bg-transparent w-full" value="">
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectField;
