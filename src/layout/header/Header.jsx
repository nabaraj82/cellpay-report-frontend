import { FiMenu } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router";
import { toggleSidebar } from "../../redux/slices/sidebarSlice";
import Progressbar from "./Progressbar";
import Menu from "./Menu";

const Header = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const segments = pathname.split("/").filter(Boolean);
  const lastSegment = segments[segments.length - 1];

  const handleTogleSidebar = () => {
    dispatch(toggleSidebar());
  };

  return (
    <header className="bg-white dark:bg-gray-700 shadow-sm z-20 relative">
      <Progressbar />
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center">
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 mr-2"
            onClick={handleTogleSidebar}
            aria-label="Open menu"
          >
            <FiMenu size={20} className="text-gray-500 dark:text-gray-300" />
          </button>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
            {lastSegment === undefined ? "dashboard" : lastSegment}
          </h2>
        </div>
        <Menu />
      </div>
    </header>
  );
};

export default Header;
