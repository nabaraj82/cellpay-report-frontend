const Switch = ({ enabled, onChange, id }) => {
  return (
    <div className="relative inline-block w-8 mr-2 align-middle select-none">
      <input
        type="checkbox"
        id={id}
        className="sr-only"
        checked={enabled}
        onChange={onChange}
      />
      <label
        htmlFor={id}
        className={`block overflow-hidden h-4 rounded-full cursor-pointer ${
          enabled ? "bg-blue-500" : "bg-gray-300"
        }`}
      >
        <span
          className={`absolute block w-3 h-3 mt-[0.13rem] ml-[0.13rem] rounded-full shadow-md transform transition-transform duration-200 ease-in-out bg-white ${
            enabled ? "translate-x-4" : ""
          }`}
        ></span>
      </label>
    </div>
  );
};

export default Switch;
