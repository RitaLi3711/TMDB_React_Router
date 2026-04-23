import { IMAGE_BASE_URL } from '@/core/constants';
import { Link } from 'react-router-dom';

type ImageGridProps = {
  results: Array<{
    id: number;
    imagePath: string | null;
    primaryText: string;
    secondaryText?: string;
  }>;
  getHref?: (id: number) => string;
};

export const ImageGrid = ({ results, getHref }: ImageGridProps) => {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,_minmax(200px,1fr))] gap-5">
      {results.map((result) => {
        const content = (
          <>
            <img className="w-full h-[280px] object-cover" src={`${IMAGE_BASE_URL}${result.imagePath}`} alt={result.primaryText} />
            <div className="p-3 text-center">
              <p className="text-sm font-semibold truncate text-[#f0f4ef]">{result.primaryText}</p>
              {result.secondaryText && <p className="text-[#bfcc94] text-xs">{result.secondaryText}</p>}
            </div>
          </>
        );
        
        return getHref ? (
          <Link
            key={result.id}
            to={getHref(result.id)}
            className="block bg-[#344966] rounded-lg overflow-hidden hover:scale-[1.02] transition"
          >
            {content}
          </Link>
        ) : (
          <div
            key={result.id}
            className="block bg-[#344966] rounded-lg overflow-hidden cursor-pointer hover:scale-[1.02] transition"
          >
            {content}
          </div>
        );
      })}
    </div>
  );
};