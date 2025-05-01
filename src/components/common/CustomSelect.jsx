import React, { useState, useRef, useEffect, KeyboardEvent } from "react";
import ErrorBlock from "./ErrorBlock";

export const CustomSelect = ({
  label = null,
  options,
  value,
  onChange,
  error,
  placeholder = "Select an option",
  className = "",
  disabled = false,
  searchable = false,
  emptyMessage = "No options available",
  width,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [focusedIndex, setFocusedIndex] = useState(null);
  const selectRef = useRef(null);
  const searchInputRef = useRef(null);

  const selectedOption = options.find((option) => option.value === value);
  const filteredOptions = searchable
    ? options.filter((option) =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : options;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Focus search input when searchable and dropdown opens
  useEffect(() => {
    if (isOpen && searchable && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen, searchable]);

  // Reset states when closing
  useEffect(() => {
    if (!isOpen) {
      setSearchTerm("");
      setFocusedIndex(null);
    }
  }, [isOpen]);

  const handleKeyDown = (e) => {
    if (disabled) return;
    switch (e.key) {
      case "Enter":
        if (!isOpen) {
          setIsOpen(true);
        } else if (focusedIndex !== null) {
          handleSelect(filteredOptions[focusedIndex].value);
        }
        e.preventDefault();
        break;

      case " ":
        if (!isOpen) {
          setIsOpen(true);
          e.preventDefault(); // Prevent page scroll
        }
        break;

      case "Escape":
        setIsOpen(false);
        break;

      case "ArrowDown":
        if (!isOpen) {
          setIsOpen(true);
        } else {
          setFocusedIndex((prev) => {
            if (prev === null) return 0;
            return Math.min(prev + 1, filteredOptions.length - 1);
          });
        }
        e.preventDefault();
        break;

      case "ArrowUp":
        if (!isOpen) {
          setIsOpen(true);
        } else {
          setFocusedIndex((prev) => {
            if (prev === null) return 0;
            return Math.max(prev - 1, 0);
          });
        }
        e.preventDefault();
        break;

      case "Tab":
        setIsOpen(false);
        break;

      default:
        if (
          searchable &&
          isOpen &&
          e.key.length === 1 &&
          !e.ctrlKey &&
          !e.metaKey
        ) {
          setSearchTerm((prev) => prev + e.key);
          setFocusedIndex(0); // Reset focus to first item when typing
          e.preventDefault();
        }
        break;
    }
  };

  const handleSelect = (value) => {
    onChange(value);
    setIsOpen(false);
  };

  return (
    <div className="flex flex-col  group"
      style={{width: width? `${width}px`: ''}}
    >
      {label && (
        <label className="block group-focus-within:text-sky-500 text-xs font-medium duration-300">
          {label}
        </label>
      )}
      <div
        ref={selectRef}
        className={`relative w-full text-xs  duration-300 mt-1 rounded-md border  outline-none focus:border-sky-500 ${className}`}
        onKeyDown={handleKeyDown}
      >
        {/* Select Trigger */}
        <button
          type="button"
          className={`flex items-center justify-between w-full px-3 py-2 text-left rounded-md  transition-all duration-200 outline-none bg-white dark:bg-gray-600 
        `}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-labelledby="select-label select-value"
        >
          <span id="select-label" className="sr-only">
            {placeholder}
          </span>
          <span
            id="select-value"
            className={`truncate flex-1 text-left ${
              !selectedOption ? "text-gray-400 dark:text-gary-300" : ""
            }`}
          >
            {selectedOption ? (
              <div className="flex items-center gap-2">
                {selectedOption.icon}
                {selectedOption.label}
              </div>
            ) : (
              placeholder
            )}
          </span>
          <span
            className={`ml-2 transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          >
            <ChevronDownIcon />
          </span>
        </button>

        {/* Dropdown Options */}
        {isOpen && (
          <div
            className="absolute z-20  mt-1 bg-white dark:bg-gray-600 border border-gray-200 rounded-md shadow-lg overflow-hidden"
            role="listbox"
            aria-labelledby="select-label"
          >
            {/* Search Input */}
            {searchable && (
              <div className="sticky top-0 p-2 text-xs bg-white dark:bg-gray-600 border-b border-gray-200 dark:border-gray-700">
                <input
                  name="search"
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setFocusedIndex(0); // Reset focus when search changes
                  }}
                  className="w-full p-2 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                  aria-controls="select-options"
                />
              </div>
            )}

            {/* Options List */}
            <div id="select-options" className="max-h-60 overflow-auto">
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option, index) => (
                  <button
                    key={option.value}
                    type="button"
                    className={`w-full text-left px-3 py-2 transition-colors truncate flex items-center gap-2
                    ${
                      option.disabled
                        ? "text-gray-400 cursor-not-allowed"
                        : "hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
                    }
                    ${
                      value === option.value
                        ? "bg-blue-50 dark:bg-gray-300 text-blue-800 font-medium"
                        : ""
                    }
                  `}
                    onClick={() =>
                      !option.disabled && handleSelect(option.value)
                    }
                    disabled={option.disabled}
                    role="option"
                    aria-selected={value === option.value}
                    tabIndex={-1}
                    onMouseEnter={() => setFocusedIndex(index)}
                  >
                    {option.icon}
                    {option.label}
                  </button>
                ))
              ) : (
                <div className="px-3 py-2 text-xs text-gray-500 text-center">
                  {emptyMessage}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      {error && <ErrorBlock message={error} />}
    </div>
  );
};

export default CustomSelect;

const ChevronDownIcon = () => (
  <svg
    className="w-4 h-4 text-gray-500"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 9l-7 7-7-7"
    />
  </svg>
);
