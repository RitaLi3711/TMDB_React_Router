import { type ImageCell } from '@/core';
import type { ReactNode } from 'react';

type ImageGridProps = {
  results: ImageCell[];
  onClick?: (id: number) => void;
  children?: (item: ImageCell) => ReactNode;
};

export const ImageGrid = ({ results, onClick, children }: ImageGridProps) => {
  return (
    <div className="grid grid-cols-5 gap-5 w-full">
      {results.map((result) => (
        <div
          key={result.id}
          className="relative bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:scale-[1.02] transition"
          onClick={() => onClick?.(result.id)}
        >
          {children?.(result)}
          {result.imageUrl ? (
            <img className="w-full h-[280px] object-cover" src={result.imageUrl} alt={result.primaryText} />
          ) : (
            <div className="w-full h-[280px] bg-gray-700 flex items-center justify-center">
              <span className="text-gray-400">No image</span>
            </div>
          )}
          <div className="p-3 text-center">
            <p className="text-sm font-semibold truncate">{result.primaryText}</p>
            {result.secondaryText && <p className="text-gray-400 text-xs">{result.secondaryText}</p>}
          </div>
        </div>
      ))}
    </div>
  );
};