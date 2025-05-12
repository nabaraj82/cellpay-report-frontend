import ErrorBlock from "@/components/common/ErrorBlock";
import Label from "@/components/common/Label";
import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CustomDatePicker = ({
  label = null,
  error,
  useDatePicker = false,
  value,
  onChange,
  width,
  name,
  min,
  ...rest
}) => {
  return (
    <div className="flex flex-col group text-sm z-50">
      {label && <Label title={label} />}

      {useDatePicker && rest.type === "date" ? (
        <DatePicker
          selected={value ? new Date(value) : null}
          onChange={(date) => {
            const syntheticEvent = {
              target: {
                name,
                value: date?.toLocaleDateString("en-CA"),
              },
            };
            onChange(syntheticEvent);
          }}
          dateFormat="yyyy-MM-dd"
          minDate={min ? new Date(min) : undefined}
          className="w-full md:min-w-[20rem] mt-1 rounded-sm border border-gray-200 px-3 py-2 outline-none focus:border-sky-500 dark:bg-transparent shadow-xs text-sm cursor-pointer"
          placeholderText="Select a date"
          name={name}
          {...rest}
        />
      ) : (
        <input
          {...rest}
          name={name}
          value={value}
          onChange={onChange}
          className="w-full md:min-w-[30rem] mt-1 rounded-sm border border-gray-200 px-3 py-2 outline-none focus:border-sky-500 dark:bg-transparent shadow-xs text-sm"
        />
      )}

      {error && <ErrorBlock message={error} />}
    </div>
  );
};

export default CustomDatePicker;
