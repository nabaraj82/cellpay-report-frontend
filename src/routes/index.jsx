import { createBrowserRouter } from "react-router";
import ProtectedRoute from "../components/auth/ProtectedRoute";
import ErrorBoundary from "../components/common/ErrorBoundary";
import RootLayout from "../layout/RootLayout";
import Dashboard from "../pages/Dashboard";
import Profile from "../pages/Profile";
import PageNotFound from "../pages/PageNotFound";
import RootLayoutWrapper from "../layout/RootLayoutWrapper";
import { privateRoutes } from "./privateRoutes";
import UserSetup from "../pages/usermanagement/UserSetup";
import RoleSetup from "../pages/usermanagement/RoleSetup";
import ScreenSetup from "../pages/screen-module-setup/ScreenSetup";
import ModuleSetup from "../pages/screen-module-setup/ModuleSetup";
import PrivilageSetup from "../pages/screen-module-setup/PrivilageSetup";
import PermissionProtectedRoute from "../components/auth/PermissionProtectedRoute";
import { SCREEN } from "../constants/screen";
import { MODULE } from "../constants/module";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <ErrorBoundary>
          <RootLayoutWrapper>
            <RootLayout />
          </RootLayoutWrapper>
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
