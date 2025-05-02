import { useSelector } from "react-redux";
import { useLocation, Navigate } from "react-router";
import PageNotFound from "../../pages/PageNotFound";

const PermissionProtectedRoute = ({ routeAccess, children }) => {
  const { currentUser } = useSelector((state) => state.user);
  const { screen, module } = routeAccess;
  const permissions = currentUser?.permissions;

  const hasPermission = Boolean(permissions?.[screen]?.[module] ?? false);

  return hasPermission ? (
    children
  ) : (
    <PageNotFound
      title="Unauthorized"
      content="you are not authorized to access this page"
      statusCode={401}
    />
  );
};

export default PermissionProtectedRoute;
