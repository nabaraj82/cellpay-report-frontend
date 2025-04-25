import React from 'react'

const ButtonPrimary = ({children, ...rest}) => {
  return (
      <button
          className="whitespace-nowrap px-4 py-2 text-sm bg-sky-500 text-white rounded-md hover:bg-sky-400  duration-300 cursor-pointer dark:hover:bg-gray-600"
          {...rest}
      >
      {children}
    </button>
  );
}

export default ButtonPrimary