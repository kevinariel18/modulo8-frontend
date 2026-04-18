import type { Content } from "@/domain/entities/Content";
import type { Favorite } from "@/domain/entities/Favorite";

interface ContentCardProps {
  content: Content;
  favorites: Favorite[];
  onAdd: (contentId: string) => void;
  onRemove: (favoriteId: string) => void;
}

export function ContentCard({ content, favorites, onAdd, onRemove }: ContentCardProps) {
  const favorite = favorites.find((f) => f.contentId === content.id);

  return (
    <li
      style={{
        border: "1px solid #ddd",
        borderRadius: 8,
        padding: 12,
        display: "flex",
        flexDirection: "column",
        gap: 8,
      }}
    >
      {content.imageUrl && (
        <img
          src={content.imageUrl}
          alt={content.title}
          style={{ width: "100%", borderRadius: 6, objectFit: "cover", height: 140 }}
        />
      )}
      <strong>{content.title}</strong>
      <span style={{ fontSize: 12, color: "#888" }}>{content.genre.name}</span>
      <p style={{ fontSize: 13, margin: 0 }}>{content.description}</p>
      {favorite ? (
        <button
          type="button"
          onClick={() => onRemove(favorite.id)}
          style={{ background: "#e53e3e", color: "#fff", border: "none", borderRadius: 6, padding: "6px 12px", cursor: "pointer" }}
        >
          ❌ Quitar de Mi Lista
        </button>
      ) : (
        <button
          type="button"
          onClick={() => onAdd(content.id)}
          style={{ background: "#3182ce", color: "#fff", border: "none", borderRadius: 6, padding: "6px 12px", cursor: "pointer" }}
        >
          ➕ Agregar a Mi Lista
        </button>
      )}
    </li>
  );
}
