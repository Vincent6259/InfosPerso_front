import { useCookies } from "react-cookie";
import { Outlet, Navigate } from "react-router-dom";

interface IPrivateRoutesComponent {
  hasToBeLogged: boolean;
}

export default function PrivateRoute({
  hasToBeLogged,
}: IPrivateRoutesComponent) {
  const [cookies] = useCookies(["access"]);
  if (hasToBeLogged) {
    return cookies.access ? <Outlet /> : <Navigate to="/login" />;
  } else {
    return !cookies.access ? <Outlet /> : <Navigate to="/" />;
  }
}
