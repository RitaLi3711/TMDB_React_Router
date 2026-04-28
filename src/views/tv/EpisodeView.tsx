import { TV_VIEW_ENDPOINT } from '@/core';
import { useTmdb } from '@/hooks';
import { FaArrowLeft, FaCalendarAlt } from 'react-icons/fa';
import { useParams, useNavigate } from 'react-router-dom';
import { ImageGrid } from '@/components';

export const EpisodeView = () => {
  const { id, seasonNumber } = useParams();
  const navigate = useNavigate();
  
  const { data } = useTmdb<any>(
    `${TV_VIEW_ENDPOINT}/${id}/season/${seasonNumber}`,
    {},
    [id, seasonNumber]
  );

  if (!data) {
    return <p className="text-gray-400">Loading episodes...</p>;
  }

  // Format episodes for ImageGrid
  const episodesData = data.episodes?.map((episode: any) => ({
    id: episode.id,
    imagePath: episode.still_path,
    primaryText: `Episode ${episode.episode_number}: ${episode.name}`,
    secondaryText: episode.air_date,
  })) || [];

  return (
    <div className="p-6">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors"
      >
        <FaArrowLeft />
        Back to Seasons
      </button>

      {/* Season Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Season {seasonNumber}</h1>
        <div className="flex items-center gap-2 text-gray-400">
          <FaCalendarAlt />
          <span>{data.air_date}</span>
        </div>
      </div>

      {/* Episodes Grid using ImageGrid */}
      <ImageGrid 
        results={episodesData}
        getHref={() => `#`}
      />
    </div>
  );
};