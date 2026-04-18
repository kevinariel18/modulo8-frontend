import { useState } from "react";
import { useAuth } from "@/presentation/hooks/useAuth";

export function PremiumButton() {
  const { user, upgradeToPremium } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!user || user.isPremium) {
    return null;
  }

  const handleUpgrade = async () => {
    try {
      setError(null);
      setIsLoading(true);
      await upgradeToPremium();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al actualizar");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h3 style={styles.title}>Hazte Premium</h3>
        <p style={styles.description}>
          Desbloquea funciones exclusivas y disfruta de una experiencia sin límites
        </p>
        
        <ul style={styles.features}>
          <li style={styles.feature}>Acceso a productos exclusivos</li>
          <li style={styles.feature}>Envío gratis en todos tus pedidos</li>
          <li style={styles.feature}>Descuentos especiales</li>
          <li style={styles.feature}>Soporte prioritario</li>
        </ul>

        {error && <div style={styles.error}>{error}</div>}

        <button
          onClick={handleUpgrade}
          disabled={isLoading}
          style={{
            ...styles.button,
            ...(isLoading ? styles.buttonDisabled : {}),
          }}
        >
          {isLoading ? "Procesando..." : "Actualizar a Premium"}
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    display: "flex",
    justifyContent: "center",
  },
  card: {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    borderRadius: "16px",
    padding: "32px",
    maxWidth: "400px",
    width: "100%",
    color: "white",
    boxShadow: "0 10px 40px rgba(102, 126, 234, 0.3)",
  },
  icon: {
    fontSize: "48px",
    textAlign: "center" as const,
    marginBottom: "16px",
  },
  title: {
    fontSize: "24px",
    fontWeight: "700",
    textAlign: "center" as const,
    marginBottom: "8px",
  },
  description: {
    fontSize: "14px",
    textAlign: "center" as const,
    opacity: 0.9,
    marginBottom: "24px",
  },
  features: {
    listStyle: "none",
    padding: 0,
    margin: "0 0 24px 0",
    display: "flex",
    flexDirection: "column" as const,
    gap: "12px",
  },
  feature: {
    fontSize: "14px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  button: {
    width: "100%",
    padding: "14px",
    fontSize: "16px",
    fontWeight: "600",
    background: "white",
    color: "#667eea",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "transform 0.2s, box-shadow 0.2s",
  },
  buttonDisabled: {
    opacity: 0.6,
    cursor: "not-allowed",
  },
  error: {
    padding: "12px",
    background: "rgba(254, 215, 215, 0.2)",
    color: "white",
    borderRadius: "8px",
    fontSize: "14px",
    textAlign: "center" as const,
    marginBottom: "16px",
    border: "1px solid rgba(255, 255, 255, 0.3)",
  },
};
