import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

const ProtectedRoute = ({ children, requireAdmin = false }: ProtectedRouteProps) => {
  const { user, token } = useAuth();

  // If not logged in, redirect to auth page
  if (!token || !user) {
    return <Navigate to="/auth" replace />;
  }

  // If admin is required but user is not admin, redirect to menu
  if (requireAdmin && user.role !== 'admin') {
    return <Navigate to="/menu" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
