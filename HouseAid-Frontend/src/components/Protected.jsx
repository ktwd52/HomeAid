import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

function Protected() {
  const { user, loading } = useContext(AuthContext);

  return <>{user ? <Outlet /> : <Navigate to="/login" />}</>;
  // return <>{!loading && <>{user ? <Outlet /> : <Navigate to="/login" />}</>}</>;
}

export default Protected;
