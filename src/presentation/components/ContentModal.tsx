import { useState, type FormEvent } from "react";
import type { Content, Genre } from "@/domain/entities/Content";
import type { CreateContentData } from "@/domain/ports/CatalogRepository";

interface ContentModalProps {
  genres: Genre[];
  editing?: Content | null;
  onSave: (data: CreateContentData) => Promise<void>;
  onClose: () => void;
}

export function ContentModal({ genres, editing, onSave, onClose }: ContentModalProps) {
  const [form, setForm] = useState<CreateContentData>({
    titulo: editing?.title ?? "",
    descripcion: editing?.description ?? "",
    clasificacion: "G",
    duracion: undefined,
    generoId: editing ? Number(editing.genre.id) : (genres[0] ? Number(genres[0].id) : 0),
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await onSave(form);
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
        <h2 style={{ margin: "0 0 20px" }}>{editing ? "Editar contenido" : "Nuevo contenido"}</h2>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <label style={labelStyle}>
            Título *
            <input
              style={input}
              value={form.titulo}
              onChange={(e) => setForm({ ...form, titulo: e.target.value })}
              required
              placeholder="Ej: Flash"
            />
          </label>

          <label style={labelStyle}>
            Descripción
            <textarea
              style={{ ...input, resize: "vertical", minHeight: 70 }}
              value={form.descripcion ?? ""}
              onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
              placeholder="Descripción del contenido"
            />
          </label>

          <div style={{ display: "flex", gap: 12 }}>
            <label style={{ ...labelStyle, flex: 1 }}>
              Clasificación
              <select
                style={input}
                value={form.clasificacion}
                onChange={(e) => setForm({ ...form, clasificacion: e.target.value })}
              >
                <option value="G">G</option>
                <option value="PG">PG</option>
                <option value="PG-13">PG-13</option>
                <option value="R">R</option>
                <option value="NC-17">NC-17</option>
              </select>
            </label>

            <label style={{ ...labelStyle, flex: 1 }}>
              Duración (min)
              <input
                style={input}
                type="number"
                min={1}
                value={form.duracion ?? ""}
                onChange={(e) => setForm({ ...form, duracion: e.target.value ? Number(e.target.value) : undefined })}
                placeholder="120"
              />
            </label>
          </div>

          <label style={labelStyle}>
            Género *
            <select
              style={input}
              value={form.generoId}
              onChange={(e) => setForm({ ...form, generoId: Number(e.target.value) })}
              required
            >
              <option value="">Selecciona un género</option>
              {genres.map((g) => (
                <option key={g.id} value={g.id}>{g.name}</option>
              ))}
            </select>
          </label>

          {error && <div style={errorBox}>{error}</div>}

          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 8 }}>
            <button type="button" onClick={onClose} style={btnSecondary} disabled={loading}>
              Cancelar
            </button>
            <button type="submit" style={btnPrimary} disabled={loading}>
              {loading ? "Guardando..." : editing ? "Guardar cambios" : "Crear contenido"}
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
  width: "100%", maxWidth: 480, boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
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
