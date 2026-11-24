export default function SearchBar({ value, onChange }) {
  return (
    <input
      className="search-bar"
      type="search"
      placeholder="Cherche un film (min. 3 lettres)…"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      autoFocus
    />
  );
}
