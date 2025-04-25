import React from 'react'

const ButtonDanger = ({children, ...rest}) => {
  return (
    <button
      className="bg-red-600 hover:bg-red-500 duration-300 text-white px-4 py-2 text-xs rounded-md cursor-pointer"
     {...rest}
    >
      {children}
    </button>
  );
}

export default ButtonDanger