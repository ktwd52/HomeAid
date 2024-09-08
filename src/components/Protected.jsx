import { useContext, useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

function Protected() {
  const { user, getProfile, loading } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      console.log("Running useEffect in function Protected", user);
      getProfile();
    }
  }, [user]);

  return <>{user ? <Outlet /> : <Navigate to="/login" />}</>;
  // return <>{!loading && <>{user ? <Outlet /> : <Navigate to="/login" />}</>}</>;
}

export default Protected;
