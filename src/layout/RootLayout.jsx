import { Outlet } from "react-router";

import Header from "./header/Header";
import { useSelector } from "react-redux";
import Main from "./main";
import Sidebar from "./Sidebar/Sidebar";

const RootLayout = () => {
  const darkMode = useSelector((state) => state.darkMode.isDarkMode);

  return (
    <div className={`flex h-screen ${darkMode ? "dark" : ""}`}>
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header />

        {/* Main section */}
        <Main />
      </div>
    </div>
  );
};

export default RootLayout;
