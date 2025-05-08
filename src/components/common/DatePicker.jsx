import React from 'react'
import Label from './Label';

const DatePicker = ({ label = null, error, ...rest }) => {
  return (
    <div className="flex flex-col group text-sm xl:text-base">
      {label && <Label title={label} />}
      <input
        {...rest}
        className="w-full md:min-w-[20rem] duration-300 mt-1 rounded-md border px-3 py-2 outline-none focus:border-sky-500 dark:bg-transparent"
      />
      {error && <ErrorBlock message={error} />}
    </div>
  );
};

export default DatePicker