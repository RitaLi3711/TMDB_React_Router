import { Button, ButtonGroup, ImageGrid } from '@/components';
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

  useEffect(() => {
    navigate(`/trending/${mediaType}?interval=${timeWindow}`, { replace: true });
  }, [timeWindow, mediaType, navigate]);

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
    navigate(type === 'movie' ? `/movie/${id}` : `/tv/${id}`);
  };

  return (
    <section className="max-w-[1600px] mx-auto p-5 space-y-5">
      <div className="flex justify-between items-center">
        <ButtonGroup
          value={mediaType}
          onClick={(value) => setMediaType(value as 'movie' | 'tv')}
          options={[
            { label: 'Movies', value: 'movie' },
            { label: 'TV', value: 'tv' },
          ]}
        />
        
        <ButtonGroup
          value={timeWindow}
          onClick={(value) => setTimeWindow(value as 'day' | 'week')}
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