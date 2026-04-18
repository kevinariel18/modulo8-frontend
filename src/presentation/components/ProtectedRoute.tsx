import { Navigate } from "react-router-dom";
import { useAuth } from "@/presentation/hooks/useAuth";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requirePremium?: boolean;
}

export function ProtectedRoute({ children, requirePremium = false }: ProtectedRouteProps) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div style={styles.container}>
        <div style={styles.spinner} />
        <p style={styles.text}>Cargando...</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requirePremium && !user.isPremium) {
    return <Navigate to="/upgrade" replace />;
  }

  return <>{children}</>;
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    gap: "16px",
  },
  spinner: {
    width: "40px",
    height: "40px",
    border: "4px solid #e2e8f0",
    borderTop: "4px solid #667eea",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
  text: {
    color: "#718096",
    fontSize: "14px",
  },
};
