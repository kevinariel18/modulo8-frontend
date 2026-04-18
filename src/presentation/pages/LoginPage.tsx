import { useAuth } from "@/presentation/hooks/useAuth";

export function LoginPage() {
  const { user, login } = useAuth();

  const handleSubmit = () => {
    void login({ email: "", password: "" });
  };

  return (
    <section>
      <h1>Iniciar sesión</h1>
      <button type="button" onClick={handleSubmit}>
        Entrar
      </button>
      {user ? <p>{user.displayName}</p> : null}
    </section>
  );
}
