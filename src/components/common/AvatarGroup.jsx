import React from "react";
import { FiUser } from "react-icons/fi";

const AvatarGroup = ({
  userCount = 0,
  maxDisplay = 5,
  size = "md",
  overlap = true,
}) => {

  const sizeClasses = {
    sm: {
      avatar: "h-6 w-6 text-xs",
      overlap: "-ml-2",
      excess: "text-[10px]",
    },
    md: {
      avatar: "h-6 w-6 text-xs",
      overlap: "-ml-3",
      excess: "text-xs",
    },
    xl: {
      avatar: "h-12 w-12 text-base",
      overlap: "-ml-4",
      excess: "text-sm",
    },
  };

  // Generate avatar array
  const visibleCount = Math.min(userCount, maxDisplay);
  const avatars = Array.from({ length: visibleCount }, (_, i) => i);
  const excessCount = userCount > maxDisplay ? userCount - maxDisplay : 0;

  // Avatar color palette
  const colors = [
    "bg-blue-500",
    "bg-purple-500",
    "bg-green-500",
    "bg-yellow-500",
    "bg-red-500",
    "bg-pink-500",
  ];

  return (
    <div className="flex items-center">
      <div className="flex">
        {avatars.map((_, index) => (
          <div
            key={index}
            className={`relative rounded-full ${sizeClasses[size].avatar} ${
              overlap && index !== 0 ? sizeClasses[size].overlap : ""
            } ${
              colors[index % colors.length]
            } flex items-center justify-center text-white font-medium border-2 border-white`}
            style={{ zIndex: avatars.length - index }}
          >
            <FiUser />
          </div>
        ))}
      </div>

      {excessCount > 0 && (
        <div
          className={`relative rounded-full ${sizeClasses[size].avatar} ${
            overlap ? sizeClasses[size].overlap : ""
          } bg-gray-200 flex items-center justify-center ${
            sizeClasses[size].excess
          } font-medium text-gray-600 border-2 border-white`}
        >
          +{excessCount}
        </div>
      )}
    </div>
  );
};

export default AvatarGroup;
