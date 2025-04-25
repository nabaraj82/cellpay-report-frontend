import React, { useEffect, useState } from 'react'
import { hasAuthParams, useAuth } from "react-oidc-context";
import { initLoader } from '../../loaders/initLoader';
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
  if (auth.isLoading || window.location.pathname === "/oidc/sign-in")
    return <div>Signing you in/out...</div>;

  if (!auth.isAuthenticated) {
    return <div>Please sign in</div>
  }
  if (auth.isAuthenticated) {
    initLoader();
  }

  return children;
}

export default ProtectedRoute