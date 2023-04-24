import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = ({ auth, children, redirectTo = "/login" }) => {
  if (!auth) {
    console.log("not authorized");
    return <Navigate to={redirectTo} />;
  }
  return children ? children : <Outlet />;
};
