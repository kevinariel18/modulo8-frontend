import type { Genre } from "@/domain/entities/Content";

interface GenreFilterProps {
  genres: Genre[];
  selected: string;
  onChange: (genreId: string) => void;
}

export function GenreFilter({ genres, selected, onChange }: GenreFilterProps) {
  return (
    <select
      value={selected}
      onChange={(e) => onChange(e.target.value)}
      style={{ padding: "8px 12px", borderRadius: 6, border: "1px solid #ccc" }}
    >
      <option value="">Todos los géneros</option>
      {genres.map((g) => (
        <option key={g.id} value={g.id}>
          {g.name}
        </option>
      ))}
    </select>
  );
}
