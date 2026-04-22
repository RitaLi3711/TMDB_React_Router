import type { ChangeEvent } from 'react';

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
};

export const SearchBar = ({ value, onChange }: SearchBarProps) => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4 text-[#f0f4ef]">Search</h1>
      <input
        type="search"
        value={value}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          onChange(e.target.value);
        }}
        placeholder="Search actors, directors..."
        className="w-full p-3 rounded-xl bg-[#344966] border border-[#0d1821] text-[#f0f4ef]
                   focus:outline-none focus:ring-2 focus:ring-[#e6aace] transition placeholder:text-[#bfcc94]"
      />
    </div>
  );
};