import React, { useState, useCallback, useMemo } from "react";

const Tooltip = ({ children, content, position = "top" }) => {
  const [visible, setVisible] = useState(false);

  // Memoize position classes to prevent unnecessary recalculations
  const positionClasses = useMemo(
    () => ({
      top: "bottom-full left-1/2 -translate-x-1/2 mb-1",
      bottom: "top-full left-1/2 -translate-x-1/2 mt-1",
      left: "right-full top-1/2 -translate-y-1/2 mr-1",
      right: "left-full top-1/2 -translate-y-1/2 ml-1",
    }),
    []
  );

  // Memoize arrow position classes
  const getArrowClasses = useCallback((pos) => {
    const classes = {
      top: "-bottom-0.5 left-1/2 -translate-x-1/2",
      bottom: "-top-0.5 left-1/2 -translate-x-1/2",
      left: "-right-0.5 top-1/2 -translate-y-1/2",
      right: "-left-0.5 top-1/2 -translate-y-1/2",
    };
    return classes[pos] || "";
  }, []);

  // Memoize event handlers
  const handleMouseEnter = useCallback(() => setVisible(true), []);
  const handleMouseLeave = useCallback(() => setVisible(false), []);

  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="inline-block"
      >
        {children}
      </div>

      {visible && (
        <div
          className={`absolute z-50 w-max max-w-xs px-2 py-0.5 text-[8px] font-medium text-white bg-gray-500 rounded shadow-sm ${positionClasses[position]}`}
        >
          {content}
          <div
            className={`absolute w-1.5 h-1.5 bg-gray-500 transform rotate-45 z-[-1] ${getArrowClasses(
              position
            )}`}
          />
        </div>
      )}
    </div>
  );
};

export default React.memo(Tooltip);
