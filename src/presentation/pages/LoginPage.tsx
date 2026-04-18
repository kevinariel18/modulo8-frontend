import { useState } from "react";
import { useAuth } from "@/presentation/hooks/useAuth";
import type { User } from "@/domain/entities/User";

interface LoginPageProps {
  onLoginSuccess?: (user: User) => void;
}

export function LoginPage({ onLoginSuccess }: LoginPageProps) {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const user = await login({ email, password });
      onLoginSuccess?.(user);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", background: "#f7fafc" }}>
      <form
        onSubmit={(e) => void handleSubmit(e)}
        style={{ background: "#fff", padding: 32, borderRadius: 10, boxShadow: "0 2px 12px rgba(0,0,0,0.1)", width: 320, display: "flex", flexDirection: "column", gap: 16 }}
      >
        <h1 style={{ margin: 0, textAlign: "center" }}>🎬 KrakeStream</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ padding: "8px 12px", borderRadius: 6, border: "1px solid #ccc" }}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ padding: "8px 12px", borderRadius: 6, border: "1px solid #ccc" }}
        />
        {error && <p style={{ color: "#c53030", margin: 0, fontSize: 13 }}>❌ {error}</p>}
        <button
          type="submit"
          disabled={loading}
          style={{ background: "#3182ce", color: "#fff", border: "none", borderRadius: 6, padding: "10px", cursor: "pointer", fontWeight: "bold" }}
        >
          {loading ? "Entrando..." : "Iniciar sesión"}
        </button>
      </form>
    </section>
  );
}
