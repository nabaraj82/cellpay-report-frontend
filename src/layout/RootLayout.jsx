import { useSelector } from "react-redux";
import Sidebar from "@/layout/Sidebar/Sidebar";
import Main from "@/layout/main";
import Header from "@/layout/header/Header";
import ReportLottie from "@/components/common/ReportLottie";

const RootLayout = () => {
  const darkMode = useSelector((state) => state.darkMode.isDarkMode);
  const { isLoading } = useSelector((state) => state.user);
  if (isLoading) {
    return <ReportLottie />;
  }

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
