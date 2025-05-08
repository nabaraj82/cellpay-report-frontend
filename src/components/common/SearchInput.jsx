import React from "react";
import { FiSearch } from "react-icons/fi";

const SearchInput = ({ value, onChange, ...rest }) => {
  return (
    <div className="relative max-w-xs">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <FiSearch className="h-4 w-4 text-gray-400" />
      </div>
      <input
        name="search"
        value={value}
        onChange={onChange}
        type="text"
        placeholder="search..."
        className="block w-full pl-9 pr-3 py-2 border border-gray-300 rounded-md text-sm leading-5 bg-white dark:bg-gray-600 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500  "
        {...rest}
      />
    </div>
  );
};

export default SearchInput;
