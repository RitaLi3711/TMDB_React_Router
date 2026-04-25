import { IMAGE_BASE_URL, TV_VIEW_ENDPOINT } from '@/core/constants';
import type { EpisodesResponse } from '@/core/types';
import { useTmdb } from '@/hooks';
import { useNavigate, useParams } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

export const EpisodeView = () => {
  const { id, seasonNumber } = useParams();
  const navigate = useNavigate();

  const { data } = useTmdb<EpisodesResponse>(
    `${TV_VIEW_ENDPOINT}/${id}/season/${seasonNumber}`,
    {},
    [id, seasonNumber]
  );

  if (!data) {
    return <p className="text-gray-400">Loading episodes...</p>;
  }

  const goBack = () => {
    navigate(-1); // Go back to SeasonsView
  };

  return (
    <div className="p-6 space-y-6">
      <button
        onClick={goBack}
        className="mb-4 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors flex items-center gap-2"
      >
        <FaArrowLeft />
        Back to Seasons
      </button>

      <h2 className="text-2xl font-bold">{data.name}</h2>
      <p className="text-gray-400">Season {seasonNumber}</p>
      
      {data.overview && (
        <p className="text-gray-300">{data.overview}</p>
      )}

      <div className="space-y-4 mt-6">
        {data.episodes.map((episode) => (
          <div
            key={episode.id}
            className="flex gap-4 p-4 bg-gray-800 rounded-lg"
          >
            {episode.still_path ? (
              <img
                src={`${IMAGE_BASE_URL}${episode.still_path}`}
                alt={episode.name}
                className="w-40 h-24 object-cover rounded"
              />
            ) : (
              <div className="w-40 h-24 bg-gray-700 rounded flex items-center justify-center text-gray-400 text-sm">
                No image
              </div>
            )}
            
            <div className="flex-1">
              <h3 className="text-xl font-semibold">
                Episode {episode.episode_number}: {episode.name}
              </h3>
              <p className="text-gray-400 text-sm">{episode.air_date}</p>
              <p className="text-gray-300 mt-2">{episode.overview}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};