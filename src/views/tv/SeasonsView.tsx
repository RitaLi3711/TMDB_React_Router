import { TV_VIEW_ENDPOINT, type TvDetailsResponse } from '@/core';
import { useTmdb } from '@/hooks';
import { useParams } from 'react-router-dom';
import { ImageGrid } from '@/components';

export const SeasonsView = () => {
  const { id } = useParams();  
  const { data } = useTmdb<TvDetailsResponse>(
    `${TV_VIEW_ENDPOINT}/${id}`,
    {},
    [id]
  );

  if (!data) {
    return <p className="text-gray-400">Loading seasons...</p>;
  }

  const seasonsData = data.seasons?.map((season) => ({
    id: season.id,
    imagePath: season.poster_path,
    primaryText: season.name,
    secondaryText: `${season.episode_count} episodes • ${season.air_date ? new Date(season.air_date).getFullYear() : 'TBA'}`,
  })) || [];

  return (
    <div className="p-6 space-y-6 max-h-[90vh] overflow-y-auto">
      <h2 className="text-2xl font-bold">Seasons</h2>
      
      <ImageGrid 
        results={seasonsData}
        getHref={(id) => {
          const season = data.seasons?.find(s => s.id === id);
          return `/tv/${data.id}/season/${season?.season_number}`;
        }}
      />
    </div>
  );
};