// views/SeasonView.tsx
import { IMAGE_BASE_URL, TV_VIEW_ENDPOINT } from '@/core/constants';
import type { SeasonDetailResponse } from '@/core/types';
import { useTmdb } from '@/hooks';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

export const SeasonsView = () => {
  const { id, seasonNumber } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const backgroundLocation = (location.state as any)?.backgroundLocation;

  const { data } = useTmdb<SeasonDetailResponse>(
    `${TV_VIEW_ENDPOINT}/${id}/season/${seasonNumber}`,
    {},
    [id, seasonNumber]
  );

  if (!data) {
    return <p className="text-center text-gray-400">Loading episodes...</p>;
  }

  const closeModal = () => {
    if (backgroundLocation) {
      navigate(backgroundLocation.pathname);
    } else {
      navigate(`/tv/${id}`);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/70 z-50 overflow-y-auto"
      onClick={closeModal}
    >
      <div
        className="max-w-5xl mx-auto my-10 bg-gray-900 rounded-2xl shadow-2xl p-8 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-3xl font-bold mb-4">
          {data.name} - Season {data.season_number}
        </h2>
        <p className="text-gray-400 mb-6">{data.overview}</p>

        <div className="space-y-4">
          {data.episodes.map((episode) => (
            <div
              key={episode.id}
              className="flex gap-4 p-4 bg-gray-800 rounded-lg hover:bg-gray-750 transition-colors"
            >
              {episode.still_path ? (
                <img
                  src={`${IMAGE_BASE_URL}${episode.still_path}`}
                  alt={episode.name}
                  className="w-40 h-24 object-cover rounded"
                />
              ) : (
                <div className="w-40 h-24 bg-gray-700 rounded flex items-center justify-center text-gray-500">
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

        <button
          onClick={closeModal}
          className="mt-6 px-6 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
};