import type { Content } from "@/domain/entities/Content";
import type { Favorite } from "@/domain/entities/Favorite";

interface ContentCardProps {
  content: Content;
  favorites: Favorite[];
  onAdd: (contentId: string) => void;
  onRemove: (favoriteId: string) => void;
  onEdit?: (content: Content) => void;
  onDelete?: (contentId: string) => void;
}

export function ContentCard({ content, favorites, onAdd, onRemove, onEdit, onDelete }: ContentCardProps) {
  const favorite = favorites.find((f) => f.contentId === content.id);

  return (
    <li style={card}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <strong style={{ fontSize: 15 }}>{content.title}</strong>
        {(onEdit || onDelete) && (
          <div style={{ display: "flex", gap: 6 }}>
            {onEdit && (
              <button type="button" onClick={() => onEdit(content)} style={btnIcon} title="Editar">
                Editar
              </button>
            )}
            {onDelete && (
              <button
                type="button"
                onClick={() => { if (confirm(`¿Eliminar "${content.title}"?`)) onDelete(content.id); }}
                style={{ ...btnIcon, color: "#e53e3e" }}
                title="Eliminar"
              >
                Eliminar
              </button>
            )}
          </div>
        )}
      </div>

      <span style={{ fontSize: 12, color: "#888", background: "#f0f0f0", borderRadius: 4, padding: "2px 8px", alignSelf: "flex-start" }}>
        {content.genre.name}
      </span>

      {content.description && (
        <p style={{ fontSize: 13, margin: 0, color: "#555", lineHeight: 1.4 }}>{content.description}</p>
      )}

      {favorite ? (
        <button type="button" onClick={() => onRemove(favorite.id)} style={btnDanger}>
          ✓ En Mi Lista
        </button>
      ) : (
        <button type="button" onClick={() => onAdd(content.id)} style={btnPrimary}>
          + Agregar a Mi Lista
        </button>
      )}
    </li>
  );
}

const card: React.CSSProperties = {
  border: "1px solid #e2e8f0", borderRadius: 10, padding: 14,
  display: "flex", flexDirection: "column", gap: 8,
  background: "#fff", boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
};
const btnPrimary: React.CSSProperties = {
  background: "#3182ce", color: "#fff", border: "none",
  borderRadius: 6, padding: "7px 12px", cursor: "pointer", fontSize: 13, fontWeight: 600,
};
const btnDanger: React.CSSProperties = {
  background: "#e53e3e", color: "#fff", border: "none",
  borderRadius: 6, padding: "7px 12px", cursor: "pointer", fontSize: 13, fontWeight: 600,
};
const btnIcon: React.CSSProperties = {
  background: "none", border: "none", cursor: "pointer",
  fontSize: 16, padding: "2px 4px", borderRadius: 4,
};
