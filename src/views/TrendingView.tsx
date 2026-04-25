import { ButtonGroup, ImageGrid, Pagination } from '@/components';
import { useTmdb } from '@/hooks';
import { useState } from 'react';

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
  const [mediaType, setMediaType] = useState<'movie' | 'tv'>('movie');
  const [timeWindow, setTimeWindow] = useState<'day' | 'week'>('day');
  const [page, setPage] = useState(1);

  const { data } = useTmdb<TrendingResponse>(
    `https://api.themoviedb.org/3/trending/${mediaType}/${timeWindow}`,
    { page },
    [mediaType, timeWindow, page]
  );

  if (!data) {
    return <p className="text-center text-gray-400">Loading trending...</p>;
  }

  // Format data for ImageGrid - NO emoji, NO "Movie"/"TV Show" text
  const gridData = data.results?.map((item: TrendingItem) => ({
    id: item.id,
    imagePath: item.poster_path,
    primaryText: item.title || item.name || '',
    secondaryText: '', // Empty - no tag at all
  })) || [];

  return (
    <section className="max-w-[1600px] mx-auto p-5 space-y-5">
      {/* Media Type Buttons */}
      <div className="flex justify-between items-center">
        <ButtonGroup
          value={mediaType}
          onClick={(value) => {
            setMediaType(value as 'movie' | 'tv');
            setPage(1);
          }}
          options={[
            { label: 'Movies', value: 'movie' },
            { label: 'TV', value: 'tv' },  // Changed from "TV Shows" to "TV"
          ]}
        />
        
        {/* Time Window Buttons */}
        <ButtonGroup
          value={timeWindow}
          onClick={(value) => {
            setTimeWindow(value as 'day' | 'week');
            setPage(1);
          }}
          options={[
            { label: 'Day', value: 'day' },
            { label: 'Week', value: 'week' },
          ]}
        />
      </div>

      <ImageGrid
        results={gridData}
        getHref={(id) => {
          const item = data.results?.find((i: TrendingItem) => i.id === id);
          return item?.media_type === 'movie' ? `/movies/${id}` : `/tv/${id}`;
        }}
      />

      <Pagination
        page={page}
        maxPages={data.total_pages}
        onClick={setPage}
      />
    </section>
  );
};