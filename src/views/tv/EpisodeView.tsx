import { TV_VIEW_ENDPOINT, IMAGE_BASE_URL, type ImageCell } from '@/core';
import { useTmdb } from '@/hooks';
import { FaArrowLeft, FaCalendarAlt } from 'react-icons/fa';
import { useParams, useNavigate } from 'react-router-dom';
import { ImageGrid } from '@/components';

interface Episode {
  id: number;
  still_path: string | null;
  episode_number: number;
  name: string;
  air_date: string;
  overview: string;
}

interface SeasonData {
  air_date: string;
  episodes: Episode[];
}

export const EpisodeView = () => {
  const { id, seasonNumber } = useParams();
  const navigate = useNavigate();
  
  const { data } = useTmdb<SeasonData>(
    `${TV_VIEW_ENDPOINT}/${id}/season/${seasonNumber}`,
    {},
    [id, seasonNumber]
  );

  if (!data) {
    return <p className="text-gray-400">Loading episodes...</p>;
  }

  // Format episodes for ImageGrid as ImageCell[]
  const episodesData: ImageCell[] = (data.episodes || []).map((episode) => ({
    id: episode.id,
    imageUrl: episode.still_path ? `${IMAGE_BASE_URL}${episode.still_path}` : '',
    primaryText: `Episode ${episode.episode_number}: ${episode.name}`,
    secondaryText: episode.air_date,
  }));

  const handleClick = (episodeId: number) => {
    // Find the episode to get its number
    const episode = data.episodes?.find((e) => e.id === episodeId);
    if (episode) {
      navigate(`/tv/${id}/season/${seasonNumber}/episode/${episode.episode_number}`);
    }
  };

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
          <span>{data.air_date || 'Date TBA'}</span>
        </div>
      </div>

      {/* Episodes Grid using ImageGrid */}
      <ImageGrid 
        results={episodesData}
        onClick={handleClick}
      />
    </div>
  );
};