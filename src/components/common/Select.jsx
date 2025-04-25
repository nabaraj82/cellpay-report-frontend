import React from "react";
import Options from "./Options";

const Select = ({ label, name,error, value, onChange, options = [] }) => {
  return (
    <p className="group">
      <label className="block group-focus-within:text-sky-500 text-sm font-medium duration-300">
        {label}
      </label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full mt-1 rounded-md border px-3 py-2 outline-none focus:border-blue-500 duration-300 cursor-pointer"
      >
        {options.map((item) => (
          <Options
            key={item}
            label={item}
            value={item === "Select role" ? "" : item}
          />
        ))}
      </select>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </p>
  );
};

export default Select;
