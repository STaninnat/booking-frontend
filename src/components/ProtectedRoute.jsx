import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

import ApiFunctions from "./ApiFunctions";

function ProtectedRoute({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const authStatus = await ApiFunctions.checkAuthStatus();
      setIsAuthenticated(authStatus);
    };

    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? children : <Navigate to="/auth" />;
}
export default ProtectedRoute;
