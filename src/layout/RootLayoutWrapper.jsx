import { useSelector } from "react-redux";

const RootLayoutWrapper = ({ children }) => {
  const { isLoading } = useSelector((state) => state.user);
  return isLoading ? <p>Loading...</p> : children;
};

export default RootLayoutWrapper;
