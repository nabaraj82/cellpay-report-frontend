import React from "react";

const ButtonPrimary = ({ children, disabled = false, ...rest }) => {
  return (
    <button
      className={`whitespace-nowrap px-4 py-2 text-sm xl:text-base rounded-md duration-300 ${
        disabled
          ? "bg-gray-400 text-gray-200 cursor-not-allowed dark:bg-gray-500 dark:text-gray-300"
          : "bg-sky-500 text-white hover:bg-sky-400 cursor-pointer dark:hover:bg-gray-600"
      }`}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
};

export default ButtonPrimary;
