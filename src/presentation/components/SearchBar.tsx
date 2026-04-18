import { useEffect, useState } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const [value, setValue] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => onSearch(value), 400);
    return () => clearTimeout(timer);
  }, [value, onSearch]);

  return (
    <input
      type="search"
      placeholder="Buscar contenido..."
      value={value}
      onChange={(e) => setValue(e.target.value)}
      style={{ padding: "8px 12px", borderRadius: 6, border: "1px solid #ccc", width: "100%", maxWidth: 400 }}
    />
  );
}
