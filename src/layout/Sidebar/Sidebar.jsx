import React from "react";
import Navigation from "./Navigation";
import { FiMenu, FiX, FiUser } from "react-icons/fi";

import logo from "../../assets/cellpay-logo.svg";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "../../redux/slices/sidebarSlice";

const Sidebar = () => {
  const isSlidebarOpen = useSelector((state) => state.sidebar.isSlidebarOpen);
  const dispatch = useDispatch();

  const handleToggleSidebar = () => {
    dispatch(toggleSidebar());
  };

  
  return (
    <>
      {/* Mobile sidebar overlay */}
      {isSlidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 bg-opacity-50 z-30 lg:hidden"
          onClick={handleToggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static z-40 w-64 h-full bg-[#F1F2F7] dark:bg-gray-800 text-stone-500
          transform ${isSlidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 transition-transform duration-300 ${
            isSlidebarOpen ? "w-64" : "lg:w-20 "
          }
          sidebar 
        `}
    //  here sidebar class animation is overiding animation of mobile view
      >
        <div className="flex flex-col h-full">
          {/* Sidebar header */}
          <div className="p-4 flex items-center justify-between  dark:border-gray-700">
            {isSlidebarOpen && (
              <img src={logo} alt="cellpay-logo" className="w-27" />
            )}
            <button
              onClick={handleToggleSidebar}
              className="p-2 rounded-lg hover:bg-indigo-600 dark:hover:bg-gray-700 hidden lg:block"
              aria-label="Toggle sidebar"
            >
              {isSlidebarOpen ? <FiX size={20} /> : <FiMenu size={20} />}
            </button>
          </div>

          {/* Navigation */}
          <Navigation />
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
