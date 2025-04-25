import React from 'react'

const Label = ({title}) => {
  return (
     <label className="block group-focus-within:text-sky-500 text-xs font-medium duration-300">
            {title}
          </label>
  )
}

export default Label