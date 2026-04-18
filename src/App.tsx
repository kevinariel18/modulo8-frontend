import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ErrorBoundary } from "@/presentation/components/ErrorBoundary";
import { ProtectedRoute } from "@/presentation/components/ProtectedRoute";
import { LoginPage } from "@/presentation/pages/LoginPage";
import { RegisterPage } from "@/presentation/pages/RegisterPage";
import { ProductsPage } from "@/presentation/pages/ProductsPage";
import { UpgradePage } from "@/presentation/pages/UpgradePage";
import { UserMenu } from "@/presentation/components/UserMenu";
import { useAuth } from "@/presentation/hooks/useAuth";

function Layout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();

  return (
    <div style={styles.layout}>
      {isAuthenticated && (
        <header style={styles.header}>
          <div style={styles.headerContent}>
            <h1 style={styles.logo}>🛍️ Mi Tienda</h1>
            <UserMenu />
          </div>
        </header>
      )}
      <main style={styles.main}>{children}</main>
    </div>
  );
}

export function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            
            <Route
              path="/products"
              element={
                <ProtectedRoute>
                  <ProductsPage />
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/upgrade"
              element={
                <ProtectedRoute>
                  <UpgradePage />
                </ProtectedRoute>
              }
            />
            
            <Route path="/" element={<Navigate to="/products" replace />} />
            <Route path="*" element={<Navigate to="/products" replace />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

const styles = {
  layout: {
    minHeight: "100vh",
    background: "#f7fafc",
  },
  header: {
    background: "white",
    borderBottom: "1px solid #e2e8f0",
    padding: "16px 0",
    position: "sticky" as const,
    top: 0,
    zIndex: 10,
  },
  headerContent: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    fontSize: "20px",
    fontWeight: "700",
    color: "#1a202c",
    margin: 0,
  },
  main: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "20px",
  },
};
