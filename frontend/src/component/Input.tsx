import React from "react";

interface InputProps {
  label: string;
  name: string;
  type?: string;
  register: any;
  errors: any;
}

const Input: React.FC<InputProps> = ({
  label,
  name,
  type = "text",
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
    <input
      id={name}
      name={name}
      type={type}
      {...register(name)}
      className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
        errors[name] ? "border-red-500" : ""
      }`}
    />
    {errors[name] && (
      <p className="text-red-500 text-xs italic">{errors[name].message}</p>
    )}
  </div>
);

export default Input;
