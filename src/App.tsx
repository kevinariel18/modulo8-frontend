import { useState } from "react";
import { LoginPage } from "@/presentation/pages/LoginPage";
import { DashboardPage } from "@/presentation/pages/DashboardPage";
import { MyListPage } from "@/presentation/pages/MyListPage";
import type { User } from "@/domain/entities/User";
import { HttpClient } from "@/infrastructure/api/httpClient";
import { API_ROUTES } from "@/config/constants";

type Page = "login" | "dashboard" | "mylist";

export function App() {
  const [page, setPage] = useState<Page>("login");
  const [user, setUser] = useState<User | null>(null);
  const [isPremium, setIsPremium] = useState(false);

  const handleLoginSuccess = (loggedUser: User) => {
    setUser(loggedUser);
    setPage("dashboard");
  };

  const handleBecomePremium = async () => {
    try {
      await new HttpClient().request(API_ROUTES.catalog.replace("/catalog", "/users/premium"), "PATCH");
      setIsPremium(true);
    } catch {
      // Si falla la API igual actualizamos localmente para demo
      setIsPremium(true);
    }
  };

  if (page === "login" || !user) {
    return <LoginPage onLoginSuccess={handleLoginSuccess} />;
  }

  if (page === "mylist") {
    return (
      <MyListPage
        isPremium={isPremium}
        onBack={() => setPage("dashboard")}
      />
    );
  }

  return (
    <DashboardPage
      isPremium={isPremium}
      onGoToMyList={() => setPage("mylist")}
      onBecomePremium={() => void handleBecomePremium()}
    />
  );
}
