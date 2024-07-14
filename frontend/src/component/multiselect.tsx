import React from "react";

interface MultiSelectProps {
  label: string;
  name: string;
  options: { label: string; value: string }[];
  register: any;
  errors: any;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  label,
  name,
  options,
  register,
  errors,
}) => (
  <div className="mb-4">
    <label
      className="block text-gray-700 text-sm font-bold mb-2"
      htmlFor={name}
    >
      {label}
    </label>
    <select
      id={name}
      name={name}
      multiple
      {...register(name)}
      className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
        errors[name] ? "border-red-500" : ""
      }`}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
    {errors[name] && (
      <p className="text-red-500 text-xs italic">{errors[name].message}</p>
    )}
  </div>
);

export default MultiSelect;
