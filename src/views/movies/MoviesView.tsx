import { ButtonGroup, ImageGrid } from '@/components';
import { MOVIES_VIEW_ENDPOINT } from '@/core/constants';
import type { MediaResponse } from '@/core/types';
import { useTmdb } from '@/hooks';
import { useSearchParams } from 'react-router-dom';

export const MoviesView = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const interval = searchParams.get('interval') || 'now-playing';
  const { data } = useTmdb<MediaResponse>(`${MOVIES_VIEW_ENDPOINT}/${interval}`, {}, [interval]);

  const gridData = (data?.results ?? []).map((result) => ({
    id: result.id,
    imagePath: result.poster_path,
    primaryText: result.original_title,
  }));

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <section className="max-w-[1200px] mx-auto p-5 space-y-5">
      <ButtonGroup
        value={interval}
        onClick={(value: string) => {
          setSearchParams({ interval: value });
        }}
        options={[
          { label: 'Now Playing', value: 'now-playing' },
          { label: 'Popular', value: 'popular' },
          { label: 'Top Rated', value: 'top-rated' },
          { label: 'Upcoming', value: 'upcoming' },
        ]}
      />
      <ImageGrid results={gridData} getHref={(id) => `/movie/${id}`} />
    </section>
  );
};
