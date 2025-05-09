import { lazy } from "react";
import { createBrowserRouter } from "react-router";
import ProtectedRoute from "../components/auth/ProtectedRoute";
import ErrorBoundary from "../components/common/ErrorBoundary";
import PageNotFound from "../pages/PageNotFound";
import PermissionProtectedRoute from "../components/auth/PermissionProtectedRoute";
import { SCREEN } from "../constants/screen";
import { MODULE } from "../constants/module";
import { privateRoutes } from "./privateRoutes";

const UserSetup = lazy(() => import("../pages/usermanagement/UserSetup"));
const RoleSetup = lazy(() => import("../pages/usermanagement/RoleSetup"));
const ScreenSetup = lazy(() =>
  import("../pages/screen-module-setup/ScreenSetup")
);
const PrivilageSetup = lazy(() =>
  import("../pages/screen-module-setup/PrivilageSetup")
);

const ModuleSetup = lazy(() =>
  import("../pages/screen-module-setup/ModuleSetup")
);

const RootLayout = lazy(() => import("../layout/RootLayout"));
const Dashboard = lazy(() => import("../pages/Dashboard"));
const Profile = lazy(() => import("../pages/Profile"));
const ChangePassword = lazy(() => import("@/pages/ChangePassword"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <ErrorBoundary>
          <RootLayout />
        </ErrorBoundary>
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: privateRoutes.userSetup,
        element: (
          <PermissionProtectedRoute
            routeAccess={{
              screen: SCREEN.USERMANAGEMENT,
              module: MODULE.USERSETUP,
            }}
          >
            <UserSetup />
          </PermissionProtectedRoute>
        ),
      },
      {
        path: privateRoutes.roleSetup,
        element: (
          <PermissionProtectedRoute
            routeAccess={{
              screen: SCREEN.USERMANAGEMENT,
              module: MODULE.ROLESETUP,
            }}
          >
            <RoleSetup />
          </PermissionProtectedRoute>
        ),
      },
      {
        path: privateRoutes.screenSetup,
        element: (
          <PermissionProtectedRoute
            routeAccess={{
              screen: SCREEN.SCREENMODULEPRIVILEGE,
              module: MODULE.SCREEN,
            }}
          >
            <ScreenSetup />
          </PermissionProtectedRoute>
        ),
      },
      {
        path: privateRoutes.moduleSetup,
        element: (
          <PermissionProtectedRoute
            routeAccess={{
              screen: SCREEN.SCREENMODULEPRIVILEGE,
              module: MODULE.MODULE,
            }}
          >
            <ModuleSetup />
          </PermissionProtectedRoute>
        ),
      },
      {
        path: privateRoutes.privilegeSetup,
        element: (
          <PermissionProtectedRoute
            routeAccess={{
              screen: SCREEN.SCREENMODULEPRIVILEGE,
              module: MODULE.PRIVILEGE,
            }}
          >
            <PrivilageSetup />
          </PermissionProtectedRoute>
        ),
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "change-password",
        element: <ChangePassword />,
      },
      {
        path: "*",
        element: (
          <PageNotFound
            title=" Page not found"
            content="Sorry, we couldn’t find the page you’re looking for."
            statusCode={404}
          />
        ),
      },
    ],
  },
]);

export default router;
