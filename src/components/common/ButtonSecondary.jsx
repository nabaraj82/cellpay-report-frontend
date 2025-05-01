const ButtonSecondary = ({ children,  ...rest }) => {
  return (
    <button
      className="block  text-left px-4 py-2  text-xs text-gray-700 dark:text-gray-700 bg-gray-300 hover:bg-gray-200 dark:hover:bg-gray-200 cursor-pointer rounded-md"
      {...rest}
    >
      {children}
    </button>
  );
};

export default ButtonSecondary;
