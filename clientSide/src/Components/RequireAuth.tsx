import { useLocation, Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { jwtDecode } from 'jwt-decode'

const RequireAuth = ({ allowedRoles, children }) => {
  const { user } = useAuth();
  const location = useLocation();

  const decoded = user?.accessToken ? jwtDecode(user.accessToken) : undefined

  const roles = decoded?.roles || []

  console.log("Auth role find: ", roles)

  const hasAccess = roles.some(role => allowedRoles?.includes(role));

  console.log("has access: ", hasAccess)

  if (hasAccess) {
    console.log("user has access")
    return children;
  }

  if (user?.accessToken) {
    return <Navigate to="/unauthorized" state={{ from: location }} replace />;
  }

  return <Navigate to="/signin" state={{ from: location }} replace />;
}

export default RequireAuth;