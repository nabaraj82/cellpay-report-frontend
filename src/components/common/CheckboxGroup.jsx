import ErrorBlock from "./ErrorBlock";

const CheckboxGroup = ({ options, label, onChange, selectedValues, error }) => {
  const handleCheckboxChange = (id) => {
    const newSelectedValues = selectedValues.includes(id)
      ? selectedValues.filter((item) => item !== id)
      : [...selectedValues, id]; 

    onChange(newSelectedValues);
  };

  return (
    <div className="space-y-2">
      {label && <label className="block font-medium">{label}</label>}
      <div className="space-x-4">
        {options.map((option) => (
          <label key={option.id} className="inline-flex items-center">
            <input
              type="checkbox"
              checked={selectedValues.includes(option.id)}
              onChange={() => handleCheckboxChange(option.id)}
              className="h-4 w-4 text-blue-600 rounded"
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
