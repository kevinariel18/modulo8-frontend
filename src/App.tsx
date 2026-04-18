import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { ErrorBoundary } from "@/presentation/components/ErrorBoundary";
import { ProtectedRoute } from "@/presentation/components/ProtectedRoute";
import { LoginPage } from "@/presentation/pages/LoginPage";
import { RegisterPage } from "@/presentation/pages/RegisterPage";
import { DashboardPage } from "@/presentation/pages/DashboardPage";
import { MyListPage } from "@/presentation/pages/MyListPage";
import { UpgradePage } from "@/presentation/pages/UpgradePage";
import { ProfilePage } from "@/presentation/pages/ProfilePage";
import { UserMenu } from "@/presentation/components/UserMenu";
import { useAuth } from "@/presentation/hooks/useAuth";

function Layout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();

  return (
    <div style={styles.layout}>
      {isAuthenticated && (
        <header style={styles.header}>
          <div style={styles.headerContent}>
            <h1 style={styles.logo}>KrakeStream</h1>
            <UserMenu />
          </div>
        </header>
      )}
      <main style={styles.main}>{children}</main>
    </div>
  );
}

function DashboardWrapper() {
  const { user, upgradeToPremium } = useAuth();
  const navigate = useNavigate();

  return (
    <DashboardPage
      isPremium={user?.isPremium ?? false}
      onGoToMyList={() => navigate("/mylist")}
      onBecomePremium={() => void upgradeToPremium()}
    />
  );
}

function MyListWrapper() {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <MyListPage
      isPremium={user?.isPremium ?? false}
      onBack={() => navigate("/dashboard")}
    />
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
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardWrapper />
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/mylist"
              element={
                <ProtectedRoute>
                  <MyListWrapper />
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

            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
            
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
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
