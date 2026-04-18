import { PremiumButton } from "@/presentation/components/PremiumButton";
import { useAuth } from "@/presentation/hooks/useAuth";
import { Navigate } from "react-router-dom";

export function UpgradePage() {
  const { user } = useAuth();

  // Si ya es premium, redirigir a productos
  if (user?.isPremium) {
    return <Navigate to="/products" replace />;
  }

  return (
    <div style={styles.container}>
      <div style={styles.hero}>
        <h1 style={styles.title}>Desbloquea todo el potencial</h1>
        <p style={styles.subtitle}>
          Únete a miles de usuarios que ya disfrutan de la experiencia premium
        </p>
      </div>

      <PremiumButton />

      <div style={styles.testimonials}>
        <h2 style={styles.testimonialsTitle}>Lo que dicen nuestros usuarios premium</h2>
        <div style={styles.testimonialGrid}>
          <div style={styles.testimonial}>
            <p style={styles.testimonialText}>
              "Desde que me hice premium, la experiencia es totalmente diferente. ¡Vale cada centavo!"
            </p>
            <p style={styles.testimonialAuthor}>- María G.</p>
          </div>
          <div style={styles.testimonial}>
            <p style={styles.testimonialText}>
              "El envío gratis y los descuentos exclusivos me han ahorrado mucho dinero."
            </p>
            <p style={styles.testimonialAuthor}>- Carlos R.</p>
          </div>
          <div style={styles.testimonial}>
            <p style={styles.testimonialText}>
              "El soporte prioritario es increíble. Siempre responden en minutos."
            </p>
            <p style={styles.testimonialAuthor}>- Ana L.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "1000px",
    margin: "0 auto",
    padding: "40px 20px",
  },
  hero: {
    textAlign: "center" as const,
    marginBottom: "48px",
  },
  title: {
    fontSize: "36px",
    fontWeight: "700",
    color: "#1a202c",
    marginBottom: "16px",
  },
  subtitle: {
    fontSize: "18px",
    color: "#718096",
  },
  testimonials: {
    marginTop: "64px",
  },
  testimonialsTitle: {
    fontSize: "24px",
    fontWeight: "700",
    color: "#1a202c",
    textAlign: "center" as const,
    marginBottom: "32px",
  },
  testimonialGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "24px",
  },
  testimonial: {
    background: "white",
    padding: "24px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  },
  testimonialText: {
    fontSize: "14px",
    color: "#2d3748",
    marginBottom: "12px",
    fontStyle: "italic",
  },
  testimonialAuthor: {
    fontSize: "12px",
    color: "#718096",
    fontWeight: "600",
  },
};
