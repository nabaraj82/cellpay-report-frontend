import {  useDispatch, useSelector } from "react-redux";
import { toggleDarkMode } from "../../redux/slices/darkModeSlice";
import UserDropdwon from "./UserDropdwon";
import { useRef, useState } from "react";
import { FiChevronDown, FiMoon, FiSun, FiUser } from "react-icons/fi";

const Menu = () => {
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const darkMode = useSelector((state) => state.darkMode.isDarkMode);
  const dispatch = useDispatch();
    const dropdownRef = useRef();
  const { currentUser } = useSelector((state) => state.user);
  function handleToggleDarkMode() {
      dispatch(toggleDarkMode());
    }
    const toggleUserDropdown = () => setUserDropdownOpen(!userDropdownOpen);

  return (
    <div className="flex items-center space-x-4">
      <button
        onClick={handleToggleDarkMode}
        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600"
        aria-label="Toggle dark mode"
      >
        {darkMode ? (
          <FiSun size={15} className="text-yellow-400" />
        ) : (
          <FiMoon size={15} className="text-gray-500" />
        )}
      </button>
      <div className="relative text-sm">
        <button
          className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600"
          onClick={toggleUserDropdown}
        >
          <FiUser size={15} className="dark:text-gray-300" />
          <span className="text-gray-700 dark:text-gray-300">
            {currentUser?.userDetails.fullName}
          </span>
          <FiChevronDown
            className={`transition-transform ${
              userDropdownOpen ? "rotate-180" : ""
            } dark:text-gray-300`}
          />
        </button>

              {userDropdownOpen && <UserDropdwon ref={dropdownRef} toggleDropdown={toggleUserDropdown} />}
      </div>
    </div>
  );
};

export default Menu;
