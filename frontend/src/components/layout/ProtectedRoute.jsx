import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import LoadingSpinner from "../ui/LoadingSpinner.jsx";

/**
 * Wraps any route that requires auth. Waits for the initial session check
 * (booting) before deciding to redirect, so a page refresh on a protected
 * route doesn't bounce a logged-in user to /login before their token is verified.
 */
function ProtectedRoute({ children }) {
  const { isAuthenticated, booting } = useAuth();

  if (booting) {
    return <LoadingSpinner label="Checking your session..." />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
