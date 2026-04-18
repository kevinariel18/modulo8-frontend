import { useState, type FormEvent } from "react";

interface GenreModalProps {
  onSave: (nombre: string) => Promise<void>;
  onClose: () => void;
}

export function GenreModal({ onSave, onClose }: GenreModalProps) {
  const [nombre, setNombre] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await onSave(nombre.trim());
      onClose();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={overlay}>
      <div style={modal}>
        <h2 style={{ margin: "0 0 20px" }}>Nuevo género</h2>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <label style={labelStyle}>
            Nombre *
            <input
              style={input}
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
              placeholder="Ej: Comedia"
              autoFocus
            />
          </label>

          {error && <div style={errorBox}>{error}</div>}

          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 8 }}>
            <button type="button" onClick={onClose} style={btnSecondary} disabled={loading}>
              Cancelar
            </button>
            <button type="submit" style={btnPrimary} disabled={loading}>
              {loading ? "Creando..." : "Crear género"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const overlay: React.CSSProperties = {
  position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)",
  display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100,
};
const modal: React.CSSProperties = {
  background: "#fff", borderRadius: 12, padding: 28,
  width: "100%", maxWidth: 380, boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
};
const labelStyle: React.CSSProperties = {
  display: "flex", flexDirection: "column", gap: 6,
  fontSize: 14, fontWeight: 500, color: "#2d3748",
};
const input: React.CSSProperties = {
  padding: "10px 12px", fontSize: 14, border: "1px solid #e2e8f0",
  borderRadius: 8, outline: "none", width: "100%", boxSizing: "border-box",
};
const btnPrimary: React.CSSProperties = {
  padding: "10px 20px", background: "#553c9a", color: "#fff",
  border: "none", borderRadius: 8, cursor: "pointer", fontWeight: 600,
};
const btnSecondary: React.CSSProperties = {
  padding: "10px 20px", background: "#e2e8f0", color: "#2d3748",
  border: "none", borderRadius: 8, cursor: "pointer", fontWeight: 600,
};
const errorBox: React.CSSProperties = {
  background: "#fff5f5", border: "1px solid #fc8181",
  borderRadius: 6, padding: 10, color: "#c53030", fontSize: 13,
};
