import { ButtonGroup, ImageGrid } from '@/components';
import { TRENDING_ENDPOINT } from '@/core/constants';
import type { MediaResponse } from '@/core/types';
import { useTmdb } from '@/hooks';
import { useSearchParams } from 'react-router-dom';

export const TrendingView = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const interval = searchParams.get('interval') || 'day';
  const { data } = useTmdb<MediaResponse>(`${TRENDING_ENDPOINT}/${interval}`, {}, [interval]);

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
      <h1 className="text-3xl font-bold mb-4">Trending</h1>
      <ButtonGroup
        value={interval}
        onClick={(value: string) => {
          setSearchParams({ interval: value });
        }}
        options={[
          { label: 'Day', value: 'day' },
          { label: 'Week', value: 'week' },
        ]}
      />
      <ImageGrid results={gridData} getHref={(id) => `/movie/${id}`} />
    </section>
  );
};
