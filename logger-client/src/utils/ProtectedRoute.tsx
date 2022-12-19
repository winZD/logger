import { FunctionComponent } from "react";
import { Navigate, Outlet } from "react-router-dom";

export type RouteProps = {
  user: string | null | undefined;
  redirectPath: string;
  children: any;
};

export const ProtectedRoute: FunctionComponent<RouteProps> = ({
  user,
  redirectPath,
  children,
}) => {
  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};
