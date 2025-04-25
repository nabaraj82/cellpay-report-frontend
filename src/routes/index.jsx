import { createBrowserRouter } from "react-router";
import ProtectedRoute from "../components/auth/ProtectedRoute";
import ErrorBoundary from "../components/common/ErrorBoundary";
import RootLayout from "../layout/RootLayout"
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
         element: <UserSetup />
         
       },
       {
         path: privateRoutes.roleSetup,
         element: <RoleSetup />
       },
       {
         path: privateRoutes.screenSetup,
         element: <ScreenSetup />
       },
       {
         path: privateRoutes.moduleSetup,
         element: <ModuleSetup />
       },
       {
         path: privateRoutes.privilegeSetup,
         element: <PrivilageSetup />
       },
       {
         path: "profile",
         element: <Profile />,
       },
       {
         path: "*",
         element: <PageNotFound />,
       },
     ],
   },
 ]);

export default router;