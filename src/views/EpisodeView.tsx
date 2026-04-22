// views/EpisodeView.tsx
import { IMAGE_BASE_URL, TV_VIEW_ENDPOINT } from '@/core/constants';
import type { SeasonDetailResponse } from '@/core/types';
import { useTmdb } from '@/hooks';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

export const EpisodeView = () => {
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
    return <p className="text-center text-[#f0f4ef]">Loading episodes...</p>;
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
      className="fixed inset-0 bg-[#0d1821]/70 backdrop-blur-md z-50 overflow-y-auto"
      onClick={closeModal}
    >
      <div
        className="max-w-5xl mx-auto my-10 bg-[#0d1821] rounded-2xl shadow-2xl p-8 relative border border-[#344966]"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-3xl font-bold mb-2 text-[#f0f4ef]">
          {data.name}
        </h2>
        <p className="text-[#bfcc94] mb-6">Season {data.season_number}</p>
        
        {data.overview && (
          <p className="text-[#f0f4ef] mb-6">{data.overview}</p>
        )}

        <div className="space-y-4">
          {data.episodes.map((episode) => (
            <div
              key={episode.id}
              className="flex gap-4 p-4 bg-[#344966] rounded-lg hover:bg-[#2a3b52] transition-colors"
            >
              {episode.still_path ? (
                <img
                  src={`${IMAGE_BASE_URL}${episode.still_path}`}
                  alt={episode.name}
                  className="w-40 h-24 object-cover rounded"
                />
              ) : (
                <div className="w-40 h-24 bg-[#0d1821] rounded flex items-center justify-center text-[#bfcc94] text-sm">
                  No image
                </div>
              )}
              
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-[#f0f4ef]">
                  Episode {episode.episode_number}: {episode.name}
                </h3>
                <p className="text-[#bfcc94] text-sm">{episode.air_date}</p>
                <p className="text-[#f0f4ef] mt-2">{episode.overview}</p>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={closeModal}
          className="mt-6 px-6 py-2 bg-[#344966] text-[#f0f4ef] rounded-lg hover:bg-[#2a3b52] transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
};