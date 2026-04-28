import { ButtonGroup, ImageGrid } from '@/components';
import { useTmdb } from '@/hooks';
import { useState } from 'react';
import { IMAGE_BASE_URL, type ImageCell } from '@/core';
import { useNavigate } from 'react-router-dom';

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
  const [mediaType, setMediaType] = useState<'movie' | 'tv'>('movie');
  const [timeWindow, setTimeWindow] = useState<'day' | 'week'>('day');

  const { data } = useTmdb<TrendingResponse>(
    `https://api.themoviedb.org/3/trending/${mediaType}/${timeWindow}`,
    {},
    [mediaType, timeWindow]
  );

  if (!data) {
    return <p className="text-center text-gray-400">Loading trending...</p>;
  }

  // Limit to first 20 results
  const limitedResults = data.results?.slice(0, 20) || [];

  // Store media types for navigation
  const mediaTypeMap = new Map<number, 'movie' | 'tv'>();
  
  // Format data for ImageGrid as ImageCell[]
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

  return (
    <section className="max-w-[1600px] mx-auto p-5 space-y-5">
      {/* Media Type Buttons */}
      <div className="flex justify-between items-center">
        <ButtonGroup
          value={mediaType}
          onClick={(value) => {
            setMediaType(value as 'movie' | 'tv');
          }}
          options={[
            { label: 'Movies', value: 'movie' },
            { label: 'TV', value: 'tv' },
          ]}
        />
        
        {/* Time Window Buttons */}
        <ButtonGroup
          value={timeWindow}
          onClick={(value) => {
            setTimeWindow(value as 'day' | 'week');
          }}
          options={[
            { label: 'Day', value: 'day' },
            { label: 'Week', value: 'week' },
          ]}
        />
      </div>

      <ImageGrid results={gridData} onClick={handleClick} />
    </section>
  );
};