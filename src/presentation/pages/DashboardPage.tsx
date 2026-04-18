import { useCallback, useState } from "react";
import { ContentCard } from "@/presentation/components/ContentCard";
import { ContentModal } from "@/presentation/components/ContentModal";
import { GenreFilter } from "@/presentation/components/GenreFilter";
import { GenreModal } from "@/presentation/components/GenreModal";
import { SearchBar } from "@/presentation/components/SearchBar";
import { useCatalog } from "@/presentation/hooks/useCatalog";
import { useFavorites } from "@/presentation/hooks/useFavorites";
import type { Content } from "@/domain/entities/Content";
import type { CreateContentData } from "@/domain/ports/CatalogRepository";

interface DashboardPageProps {
  isPremium: boolean;
  onGoToMyList: () => void;
  onBecomePremium: () => void;
}

export function DashboardPage({ isPremium, onGoToMyList, onBecomePremium }: DashboardPageProps) {
  const { contents, genres, loading, error, search, filterByGenre, createContent, updateContent, deleteContent, createGenero } = useCatalog();
  const { favorites, error: favError, addFavorite, removeFavorite } = useFavorites(isPremium);

  const [selectedGenre, setSelectedGenre] = useState("");
  const [showContentModal, setShowContentModal] = useState(false);
  const [showGenreModal, setShowGenreModal] = useState(false);
  const [editingContent, setEditingContent] = useState<Content | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  const handleGenreChange = useCallback((genreId: string) => {
    setSelectedGenre(genreId);
    filterByGenre(genreId);
  }, [filterByGenre]);

  const handleSearch = useCallback((query: string) => {
    search(query);
  }, [search]);

  const handleSaveContent = async (data: CreateContentData) => {
    setActionError(null);
    try {
      if (editingContent) {
        await updateContent(editingContent.id, data);
      } else {
        await createContent(data);
      }
      setEditingContent(null);
    } catch (e) {
      setActionError((e as Error).message);
      throw e;
    }
  };

  const handleDelete = async (id: string) => {
    setActionError(null);
    try {
      await deleteContent(id);
    } catch (e) {
      setActionError((e as Error).message);
    }
  };

  const handleSaveGenre = async (nombre: string) => {
    setActionError(null);
    try {
      await createGenero(nombre);
    } catch (e) {
      setActionError((e as Error).message);
      throw e;
    }
  };

  return (
    <section style={{ padding: 24, maxWidth: 960, margin: "0 auto" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, flexWrap: "wrap", gap: 10 }}>
        <h1 style={{ margin: 0 }}>🎬 Catálogo</h1>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <button type="button" onClick={() => setShowGenreModal(true)} style={btnOutline}>
            + Género
          </button>
          <button type="button" onClick={() => { setEditingContent(null); setShowContentModal(true); }} style={btnGreen}>
            + Contenido
          </button>
          {!isPremium && (
            <button type="button" onClick={onBecomePremium} style={btnGold}>
              ⭐ Premium
            </button>
          )}
          <button type="button" onClick={onGoToMyList} style={btnPurple}>
            Mi Lista ({favorites.length})
          </button>
        </div>
      </div>

      {/* Filtros */}
      <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
        <SearchBar onSearch={handleSearch} />
        <GenreFilter genres={genres} selected={selectedGenre} onChange={handleGenreChange} />
      </div>

      {/* Errores */}
      {(favError || actionError) && (
        <div style={errorBox}>{favError ?? actionError}</div>
      )}
      {error && <div style={errorBox}>{error}</div>}

      {/* Catálogo */}
      {loading && <p style={{ textAlign: "center", color: "#888" }}>Cargando catálogo...</p>}
      {!loading && !error && contents.length === 0 && (
        <p style={{ textAlign: "center", color: "#888" }}>
          No hay contenidos. ¡Crea el primero con el botón "+ Contenido"!
        </p>
      )}

      <ul style={{ listStyle: "none", padding: 0, display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))", gap: 16 }}>
        {contents.map((content) => (
          <ContentCard
            key={content.id}
            content={content}
            favorites={favorites}
            onAdd={(id) => void addFavorite(id)}
            onRemove={(id) => void removeFavorite(id)}
            onEdit={(c) => { setEditingContent(c); setShowContentModal(true); }}
            onDelete={(id) => void handleDelete(id)}
          />
        ))}
      </ul>

      {/* Modales */}
      {showContentModal && (
        <ContentModal
          genres={genres}
          editing={editingContent}
          onSave={handleSaveContent}
          onClose={() => { setShowContentModal(false); setEditingContent(null); }}
        />
      )}
      {showGenreModal && (
        <GenreModal
          onSave={handleSaveGenre}
          onClose={() => setShowGenreModal(false)}
        />
      )}
    </section>
  );
}

const btnGreen: React.CSSProperties = {
  background: "#38a169", color: "#fff", border: "none",
  borderRadius: 6, padding: "8px 16px", cursor: "pointer", fontWeight: 600,
};
const btnOutline: React.CSSProperties = {
  background: "#fff", color: "#553c9a", border: "2px solid #553c9a",
  borderRadius: 6, padding: "8px 16px", cursor: "pointer", fontWeight: 600,
};
const btnGold: React.CSSProperties = {
  background: "#d69e2e", color: "#fff", border: "none",
  borderRadius: 6, padding: "8px 16px", cursor: "pointer", fontWeight: 600,
};
const btnPurple: React.CSSProperties = {
  background: "#553c9a", color: "#fff", border: "none",
  borderRadius: 6, padding: "8px 16px", cursor: "pointer", fontWeight: 600,
};
const errorBox: React.CSSProperties = {
  background: "#fff5f5", border: "1px solid #fc8181",
  borderRadius: 6, padding: 12, marginBottom: 16, color: "#c53030",
};
