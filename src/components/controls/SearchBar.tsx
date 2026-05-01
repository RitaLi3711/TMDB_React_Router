type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
};

export const SearchBar = ({ value, onChange }: SearchBarProps) => {
  return (
    <input
      type="search"
      value={value}
      onChange={(event) => {
        onChange(event.target.value);
      }}
      placeholder="Search..."
      className="p-2 rounded-xl bg-gray-800 border border-gray-700 
                     focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
    />
  );
};
