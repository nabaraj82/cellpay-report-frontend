import ErrorBlock from "./ErrorBlock";
import Label from "./Label";

const Input = ({ label = null, error, ...rest }) => {
  return (
    <div className="flex flex-col group text-xs">
      {label && <Label title={label} />}
      <input
        {...rest}
        className="w-full md:min-w-[20rem] duration-300 mt-1 rounded-md border px-3 py-2 outline-none focus:border-sky-500 dark:bg-transparent"
      />
      {error && <ErrorBlock message={error} />}
    </div>
  );
};

export default Input;
