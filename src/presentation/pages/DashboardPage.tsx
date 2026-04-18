import { useCallback, useState } from "react";
import { ContentCard } from "@/presentation/components/ContentCard";
import { GenreFilter } from "@/presentation/components/GenreFilter";
import { SearchBar } from "@/presentation/components/SearchBar";
import { useCatalog } from "@/presentation/hooks/useCatalog";
import { useFavorites } from "@/presentation/hooks/useFavorites";

interface DashboardPageProps {
  isPremium: boolean;
  onGoToMyList: () => void;
  onBecomePremium: () => void;
}

export function DashboardPage({ isPremium, onGoToMyList, onBecomePremium }: DashboardPageProps) {
  const { contents, genres, loading, error, search, filterByGenre } = useCatalog();
  const { favorites, error: favError, addFavorite, removeFavorite } = useFavorites(isPremium);
  const [selectedGenre, setSelectedGenre] = useState("");

  const handleGenreChange = useCallback(
    (genreId: string) => {
      setSelectedGenre(genreId);
      void filterByGenre(genreId);
    },
    [filterByGenre]
  );

  const handleSearch = useCallback(
    (query: string) => {
      void search(query);
    },
    [search]
  );

  return (
    <section style={{ padding: 24, maxWidth: 900, margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <h1 style={{ margin: 0 }}>KrakeStream</h1>
        <div style={{ display: "flex", gap: 10 }}>
          {!isPremium && (
            <button
              type="button"
              onClick={onBecomePremium}
              style={{ background: "#d69e2e", color: "#fff", border: "none", borderRadius: 6, padding: "8px 16px", cursor: "pointer" }}
            >
              Hazte Premium
            </button>
          )}
          <button
            type="button"
            onClick={onGoToMyList}
            style={{ background: "#553c9a", color: "#fff", border: "none", borderRadius: 6, padding: "8px 16px", cursor: "pointer" }}
          >
            Mi Lista ({favorites.length})
          </button>
        </div>
      </div>

      <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
        <SearchBar onSearch={handleSearch} />
        <GenreFilter genres={genres} selected={selectedGenre} onChange={handleGenreChange} />
      </div>

      {/* Feedback de favoritos */}
      {favError && (
        <div style={{ background: "#fff5f5", border: "1px solid #fc8181", borderRadius: 6, padding: 12, marginBottom: 16, color: "#c53030" }}>
          {favError}
        </div>
      )}

      {loading && <p style={{ textAlign: "center", color: "#888" }}>Cargando catálogo...</p>}
      {error && (
        <div style={{ background: "#fff5f5", border: "1px solid #fc8181", borderRadius: 6, padding: 12, color: "#c53030" }}>
          {error}
        </div>
      )}
      {!loading && !error && contents.length === 0 && (
        <p style={{ textAlign: "center", color: "#888" }}>No se encontraron contenidos.</p>
      )}

      <ul style={{ listStyle: "none", padding: 0, display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 16 }}>
        {contents.map((content) => (
          <ContentCard
            key={content.id}
            content={content}
            favorites={favorites}
            onAdd={(id) => void addFavorite(id)}
            onRemove={(id) => void removeFavorite(id)}
          />
        ))}
      </ul>
    </section>
  );
}
