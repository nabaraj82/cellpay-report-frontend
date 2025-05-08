import ErrorBlock from "./ErrorBlock";

const CheckboxGroup = ({ options, label, onChange, error }) => {
  return (
    <div className="space-y-2 text-sm xl:text-base">
      {label && <label className="block font-medium">{label}</label>}
      <div className="space-x-4">
        {options.map((option) => (
          <label key={option.id} className="inline-flex items-center">
            <input
              name="checkbox"
              type="checkbox"
              checked={option.isSelected}
              onChange={() => onChange(option)}
              className="h-3 w-3 text-blue-600 rounded cursor-pointer"
            />
            <span className="ml-2">{option.name}</span>
          </label>
        ))}
      </div>
      {error && <ErrorBlock message={error} />}
    </div>
  );
};

export default CheckboxGroup;
