import ErrorBlock from "./ErrorBlock";
import Label from "./Label";



const Input = ({ label = null, error, width, ...rest }) => {
  return (
    <div className="flex flex-col group text-sm">
      {label && <Label title={label} />}
      <input
        {...rest}
        className="w-full md:min-w-[30rem] duration-300 mt-1 rounded-sm border border-gray-200 px-3 py-2 outline-none focus:border-sky-500 dark:bg-transparent shadow-xs "
        // style={{ width: width ? `${width}px` : "20rem" }}
      />
      {error && <ErrorBlock message={error} />}
    </div>
  );
};

export default Input;
