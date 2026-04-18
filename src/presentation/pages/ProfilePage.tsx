import { useAuth } from "@/presentation/hooks/useAuth";
import { useNavigate } from "react-router-dom";

export function ProfilePage() {
  const { user, upgradeToPremium } = useAuth();
  const navigate = useNavigate();

  if (!user) return null;

  const handleUpgrade = async () => {
    await upgradeToPremium();
  };

  return (
    <section style={{ maxWidth: 480, margin: "40px auto", padding: "0 20px" }}>
      <button
        type="button"
        onClick={() => navigate("/dashboard")}
        style={btnBack}
      >
        Volver
      </button>

      <div style={card}>
        <div style={avatar}>{user.displayName.charAt(0).toUpperCase()}</div>
        <h2 style={{ margin: "12px 0 4px" }}>{user.displayName}</h2>
        <p style={{ color: "#718096", margin: 0 }}>{user.email}</p>

        {user.isPremium ? (
          <span style={badgePremium}>Premium</span>
        ) : (
          <span style={badgeFree}>Plan gratuito</span>
        )}
      </div>

      <div style={infoCard}>
        <Row label="Email" value={user.email} />
        <Row label="Plan" value={user.isPremium ? "Premium" : "Gratuito"} />
        <Row label="ID" value={user.id} />
      </div>

      {!user.isPremium && (
        <button type="button" onClick={handleUpgrade} style={btnUpgrade}>
          Actualizar a Premium
        </button>
      )}
    </section>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", borderBottom: "1px solid #e2e8f0" }}>
      <span style={{ color: "#718096", fontSize: 14 }}>{label}</span>
      <span style={{ fontWeight: 500, fontSize: 14 }}>{value}</span>
    </div>
  );
}

const card: React.CSSProperties = {
  background: "#fff", borderRadius: 12, padding: 24,
  textAlign: "center", boxShadow: "0 2px 8px rgba(0,0,0,0.08)", marginBottom: 16,
};
const infoCard: React.CSSProperties = {
  background: "#fff", borderRadius: 12, padding: "0 24px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.08)", marginBottom: 16,
};
const avatar: React.CSSProperties = {
  width: 64, height: 64, borderRadius: "50%",
  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  color: "#fff", display: "flex", alignItems: "center", justifyContent: "center",
  fontSize: 28, fontWeight: 700, margin: "0 auto",
};
const badgePremium: React.CSSProperties = {
  display: "inline-block", marginTop: 10, padding: "4px 14px",
  background: "#d69e2e", color: "#fff", borderRadius: 20, fontSize: 12, fontWeight: 600,
};
const badgeFree: React.CSSProperties = {
  display: "inline-block", marginTop: 10, padding: "4px 14px",
  background: "#e2e8f0", color: "#718096", borderRadius: 20, fontSize: 12, fontWeight: 600,
};
const btnBack: React.CSSProperties = {
  background: "none", border: "1px solid #ccc", borderRadius: 6,
  padding: "6px 14px", cursor: "pointer", marginBottom: 20,
};
const btnUpgrade: React.CSSProperties = {
  width: "100%", padding: 14, background: "#553c9a", color: "#fff",
  border: "none", borderRadius: 8, cursor: "pointer", fontWeight: 600, fontSize: 15,
};
