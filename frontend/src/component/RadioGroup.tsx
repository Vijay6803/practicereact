import React from "react";

interface RadioGroupProps {
  label: string;
  name: string;
  options: { label: string; value: string }[];
  register: any;
  errors: any;
}

const RadioGroup: React.FC<RadioGroupProps> = ({
  label,
  name,
  options,
  register,
  errors,
}) => (
  <div className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2">
      {label}
    </label>
    <div>
      {options.map((option) => (
        <label key={option.value} className="inline-flex items-center mr-4">
          <input
            type="radio"
            value={option.value}
            {...register(name)}
            className="form-radio text-indigo-600"
          />
          <span className="ml-2">{option.label}</span>
        </label>
      ))}
    </div>
    {errors[name] && (
      <p className="text-red-500 text-xs italic">{errors[name].message}</p>
    )}
  </div>
);

export default RadioGroup;
