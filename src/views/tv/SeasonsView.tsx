import { TV_VIEW_ENDPOINT, IMAGE_BASE_URL, type TvDetailsResponse, type ImageCell } from '@/core';
import { useTmdb } from '@/hooks';
import { useParams, useNavigate } from 'react-router-dom';
import { ImageGrid } from '@/components';

export const SeasonsView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const { data } = useTmdb<TvDetailsResponse>(
    `${TV_VIEW_ENDPOINT}/${id}`,
    {},
    [id]
  );

  if (!data) {
    return <p className="text-gray-400">Loading seasons...</p>;
  }

  // Store season numbers in a map
  const seasonNumberMap = new Map<number, number>();
  
  const seasonsData: ImageCell[] = (data.seasons || []).map((season) => {
    seasonNumberMap.set(season.id, season.season_number);
    return {
      id: season.id,
      imageUrl: season.poster_path ? `${IMAGE_BASE_URL}${season.poster_path}` : '',
      primaryText: season.name,
      secondaryText: `${season.episode_count} episodes • ${season.air_date ? new Date(season.air_date).getFullYear() : 'TBA'}`,
    };
  });

  const handleClick = (seasonId: number) => {
    const seasonNumber = seasonNumberMap.get(seasonId);
    if (seasonNumber !== undefined) {
      navigate(`/tv/${data.id}/season/${seasonNumber}`);
    }
  };

  return (
    <div className="p-6 space-y-6 max-h-[90vh] overflow-y-auto">
      <h2 className="text-2xl font-bold">Seasons</h2>
      
      <ImageGrid 
        results={seasonsData}
        onClick={handleClick}
      />
    </div>
  );
};