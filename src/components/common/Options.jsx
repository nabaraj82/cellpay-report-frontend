import React from 'react'

const Options = ({label, value}) => {
  return (
      <option className='cursor-pointer' value={value}>{label}</option>
  )
}

export default Options