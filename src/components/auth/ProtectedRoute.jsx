import React, { lazy, useEffect, useState } from 'react'
import { hasAuthParams, useAuth } from "react-oidc-context";
import { initLoader } from '../../loaders/initLoader';
import ButtonPrimary from '@/components/common/ButtonPrimary';
const ReportLottie = lazy(() => import("../common/ReportLottie"));
const ProtectedRoute = ({ children }) => {
  const [hasTriedSignin, setHasTriedSignin] = useState(false);
  const auth = useAuth();

  useEffect(() => {
    if (
      !hasAuthParams() &&
      !auth.isAuthenticated &&
      !auth.activeNavigator &&
      !auth.isLoading &&
      !hasTriedSignin
    ) {
      auth.signinRedirect();
      setHasTriedSignin(true);
    }
  }, [auth, hasTriedSignin]);

    useEffect(() => {
    if (window.location.pathname === "/oidc/sign-in") {
      window.location.pathname =  "/";
    }
  }, []);
  if (auth.isLoading || window.location.pathname === "/oidc/sign-in") return <ReportLottie />;
    
    

  // if (!auth.isAuthenticated) {
  //   return <div>
  //     <ReportLottie />
  //     <p>Please refresh page..</p>
  //   </div>
  // }
  if (auth.isAuthenticated) {
    initLoader();
    return children;
  }
  if (!auth.isAuthenticated && hasTriedSignin) {
    return (
      <div>
        <p>Authentication failed. Please try again.</p>
        <ButtonPrimary type="button" onClick={() =>setHasTriedSignin(false)}>
          Retry Again!
        </ButtonPrimary>
      </div>
    );
  }

  // 4. Initial state (before first redirect attempt)
  return <p>Initializing authentication...</p>;

}

export default ProtectedRoute