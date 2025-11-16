import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

const ProtectedRoute = ({ children, requireAdmin = false }: ProtectedRouteProps) => {
  const { user, token } = useAuth();

  console.log('ProtectedRoute check:', { token, user, requireAdmin });

  // If not logged in, redirect to auth page
  if (!token || !user) {
    console.log('No token or user, redirecting to /auth');
    return <Navigate to="/auth" replace />;
  }

  // If admin is required but user is not admin, redirect to menu
  if (requireAdmin && user.role !== 'admin') {
    console.log('Admin required but user is not admin, redirecting to /menu');
    return <Navigate to="/menu" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
