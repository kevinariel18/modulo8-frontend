import { useFavorites } from "@/presentation/hooks/useFavorites";

interface MyListPageProps {
  isPremium: boolean;
  onBack: () => void;
}

export function MyListPage({ isPremium, onBack }: MyListPageProps) {
  const { favorites, loading, error, removeFavorite } = useFavorites(isPremium);

  return (
    <section style={{ padding: 24, maxWidth: 900, margin: "0 auto" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
        <button
          type="button"
          onClick={onBack}
          style={{ background: "none", border: "1px solid #ccc", borderRadius: 6, padding: "6px 12px", cursor: "pointer" }}
        >
          ← Volver
        </button>
        <h1 style={{ margin: 0 }}>Mi Lista</h1>
        {isPremium && <span style={{ background: "#d69e2e", color: "#fff", borderRadius: 12, padding: "2px 10px", fontSize: 12 }}>Premium</span>}
      </div>

      {loading && <p style={{ color: "#888" }}>Cargando tu lista...</p>}
      {error && (
        <div style={{ background: "#fff5f5", border: "1px solid #fc8181", borderRadius: 6, padding: 12, color: "#c53030" }}>
          {error}
        </div>
      )}
      {!loading && !error && favorites.length === 0 && (
        <p style={{ color: "#888", textAlign: "center" }}>Tu lista está vacía. ¡Agrega contenido desde el catálogo!</p>
      )}

      <ul style={{ listStyle: "none", padding: 0, display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 16 }}>
        {favorites.map((fav) => (
          <li
            key={fav.id}
            style={{ border: "1px solid #ddd", borderRadius: 8, padding: 12, display: "flex", flexDirection: "column", gap: 8 }}
          >
            {fav.content.imageUrl && (
              <img
                src={fav.content.imageUrl}
                alt={fav.content.title}
                style={{ width: "100%", borderRadius: 6, objectFit: "cover", height: 140 }}
              />
            )}
            <strong>{fav.content.title}</strong>
            <span style={{ fontSize: 12, color: "#888" }}>{fav.content.genre.name}</span>
            <button
              type="button"
              onClick={() => void removeFavorite(fav.id)}
              style={{ background: "#e53e3e", color: "#fff", border: "none", borderRadius: 6, padding: "6px 12px", cursor: "pointer" }}
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
