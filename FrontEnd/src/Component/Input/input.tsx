import React from "react";

interface Props {
  label: string;
  type: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  icon?: React.ReactNode; 
  name:string
}

const Input: React.FC<Props> = ({
  label,
  type,
  value,
  onChange,
  placeholder,
  icon,
  name
}) => {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        {label}
      </label>

      <div className="relative">
        {icon && (
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            {icon}
          </span>
        )}

        <input
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full px-4 py-3 rounded-xl border-2 border-gray-200
            focus:border-purple-500 focus:ring-4 focus:ring-purple-100
            outline-none transition
            ${icon ? "pl-12" : ""}`}
        />
      </div>
    </div>
  );
};

export default Input;
