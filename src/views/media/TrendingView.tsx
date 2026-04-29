import { ButtonGroup, ImageGrid } from '@/components';
import { useTmdb } from '@/hooks';
import { useState, useEffect } from 'react';
import { IMAGE_BASE_URL, type ImageCell } from '@/core';
import { useNavigate, useSearchParams } from 'react-router-dom';

interface TrendingItem {
  id: number;
  title?: string;
  name?: string;
  poster_path: string;
  media_type: 'movie' | 'tv';
}

interface TrendingResponse {
  results: TrendingItem[];
  total_pages: number;
  page: number;
}

export const TrendingView = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const [mediaType, setMediaType] = useState<'movie' | 'tv'>('movie');
  const [timeWindow, setTimeWindow] = useState<'day' | 'week'>(
    (searchParams.get('interval') as 'day' | 'week') || 'day'
  );

  // Update URL when timeWindow changes OR when component mounts
  useEffect(() => {
    navigate(`/trending/${mediaType}?interval=${timeWindow}`, { replace: true });
  }, [timeWindow, mediaType]);

  const { data } = useTmdb<TrendingResponse>(
    `https://api.themoviedb.org/3/trending/${mediaType}/${timeWindow}`,
    {},
    [mediaType, timeWindow]
  );

  if (!data) {
    return <p className="text-center text-gray-400">Loading trending...</p>;
  }

  const limitedResults = data.results?.slice(0, 20) || [];

  const mediaTypeMap = new Map<number, 'movie' | 'tv'>();
  
  const gridData: ImageCell[] = limitedResults.map((item: TrendingItem) => {
    mediaTypeMap.set(item.id, item.media_type);
    return {
      id: item.id,
      imageUrl: item.poster_path ? `${IMAGE_BASE_URL}${item.poster_path}` : '',
      primaryText: item.title || item.name || '',
      secondaryText: '',
    };
  });

  const handleClick = (id: number) => {
    const type = mediaTypeMap.get(id);
    navigate(type === 'movie' ? `/movies/${id}` : `/tv/${id}`);
  };

  const handleMediaTypeChange = (value: string) => {
    setMediaType(value as 'movie' | 'tv');
    navigate(`/trending/${value}`);
  };

  const handleTimeWindowChange = (value: string) => {
    const newTimeWindow = value as 'day' | 'week';
    setTimeWindow(newTimeWindow);
    // Always update URL with interval, even if it's the same
    navigate(`/trending/${mediaType}?interval=${newTimeWindow}`, { replace: true });
  };

  return (
    <section className="max-w-[1600px] mx-auto p-5 space-y-5">
      <div className="flex justify-between items-center">
        {/* Movies/TV buttons with highlighting */}
        <div className="flex gap-2">
          <button
            onClick={() => handleMediaTypeChange('movie')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              mediaType === 'movie'
                ? 'bg-[#bfcc94] text-[#0d1821] font-semibold'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            Movies
          </button>
          <button
            onClick={() => handleMediaTypeChange('tv')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              mediaType === 'tv'
                ? 'bg-[#bfcc94] text-[#0d1821] font-semibold'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            TV
          </button>
        </div>
        
        {/* Day/Week buttons with highlighting */}
        <div className="flex gap-2">
          <button
            onClick={() => handleTimeWindowChange('day')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              timeWindow === 'day'
                ? 'bg-[#bfcc94] text-[#0d1821] font-semibold'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            Day
          </button>
          <button
            onClick={() => handleTimeWindowChange('week')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              timeWindow === 'week'
                ? 'bg-[#bfcc94] text-[#0d1821] font-semibold'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            Week
          </button>
        </div>
      </div>

      <ImageGrid results={gridData} onClick={handleClick} />
    </section>
  );
};