const ButtonSecondary = ({ children,  ...rest }) => {
  return (
    <button
      className="block  text-left px-4 py-2  text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer rounded-md"
      {...rest}
    >
      {children}
    </button>
  );
};

export default ButtonSecondary;
