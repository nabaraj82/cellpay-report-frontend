import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router";
import { toggleSidebar } from "../../redux/slices/sidebarSlice";

const NavItem = ({ icon, text, path, subItems = [] }) => {
  const [openSubmenu, setOpenSubmenu] = useState(false);
  const isSlidebarOpen = useSelector((state) => state.sidebar.isSlidebarOpen);
  const dispatch = useDispatch();
  const cls = "flex items-center w-full p-3 my-1 rounded-lg transition-colors";

  if (!isSlidebarOpen && openSubmenu) {
    setOpenSubmenu(false);
  }
  function handleOpenSubmenu() {
    setOpenSubmenu(!openSubmenu);
    if (!isSlidebarOpen) {
      dispatch(toggleSidebar());
    }
  }

  if (subItems.length === 0) {
    return (
      <NavLink
        end
        to={path}
        className={({ isActive }) =>
          `${cls} ${
            isActive
              ? "bg-sky-500 dark:bg-gray-700 text-white"
              : "hover:bg-sky-500 dark:hover:bg-gray-700 hover:text-white"
          }`
        }
      >
        <span className="transition-colors group-[.active]:text-white group-hover:text-white">
          {icon}
        </span>
        {isSlidebarOpen && (
          <span className="ml-3 text-xs whitespace-nowrap">{text}</span>
        )}
      </NavLink>
    );
  }

  return (
    <div className="relative">
      <button
        className={`${cls} hover:bg-sky-500 dark:hover:bg-gray-700 hover:text-white`}
        onClick={handleOpenSubmenu}
      >
        <span className="transition-colors group-[.active]:text-white group-hover:text-white">
          {icon}
        </span>
        {isSlidebarOpen && (
          <>
            <span className="ml-3 text-xs whitespace-nowrap">{text}</span>
            <span
              className={`ml-auto transition-transform duration-200 text-xs ${
                openSubmenu ? "rotate-90" : ""
              }`}
            >
              ▶
            </span>
          </>
        )}
      </button>

      <div className={`overflow-hidden ${openSubmenu ? "block" : "hidden"}`}>
        <ul className="pl-4">
          {subItems.map((item) => (
            <li key={item.text}>
              <NavItem
                path={item.path}
                text={item.text}
                icon={item.icon}
                subItems={item.subItems || []}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NavItem;
