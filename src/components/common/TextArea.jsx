import React from 'react'
import Label from './Label';

const TextArea = ({label, error, ...rest}) => {
  return (
    <div className="flex flex-col group">
      <Label title={label} />
      <textarea
        {...rest}
        className="w-full text-sm md:min-w-[20rem] duration-300 mt-1 rounded-md border px-3 py-2 outline-none focus:border-sky-500"
      />
      {error && <span className="text-red-500 text-xs mt-1">{error}</span>}
    </div>
  );
}

export default TextArea