import { TV_VIEW_ENDPOINT, IMAGE_BASE_URL } from '@/core/constants';
import type { TvDetailsResponse } from '@/core/types';
import { useTmdb } from '@/hooks';
import { FaCalendarAlt, FaTv, FaArrowLeft } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import { useState } from 'react';  // Add this line

export const SeasonsView = () => {
  const { id } = useParams();
  const [selectedSeason, setSelectedSeason] = useState<number | null>(null);
  
  const { data } = useTmdb<TvDetailsResponse>(
    `${TV_VIEW_ENDPOINT}/${id}`,
    {},
    [id]
  );

  if (!data) {
    return <p className="text-gray-400">Loading seasons...</p>;
  }

  if (selectedSeason) {
    return <EpisodeView seasonNumber={selectedSeason} onBack={() => setSelectedSeason(null)} />;
  }

  return (
    <div className="p-6 space-y-6 max-h-[90vh] overflow-y-auto">
      <div className="flex items-center gap-4 mb-6">
        <img 
          src={`${IMAGE_BASE_URL}${data.poster_path}`} 
          alt={data.name}
          className="w-16 h-24 object-cover rounded-lg"
        />
        <div>
          <h2 className="text-2xl font-bold">{data.name}</h2>
          <p className="text-gray-400">All Seasons</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.seasons?.map((season) => (
          <div
            key={season.id}
            onClick={() => setSelectedSeason(season.season_number)}
            className="bg-gray-800 rounded-lg overflow-hidden hover:scale-105 transition-transform cursor-pointer"
          >
            {season.poster_path ? (
              <img
                src={`${IMAGE_BASE_URL}${season.poster_path}`}
                alt={season.name}
                className="w-full h-48 object-cover"
              />
            ) : (
              <div className="w-full h-48 bg-gray-700 flex items-center justify-center">
                <FaTv className="text-4xl text-gray-500" />
              </div>
            )}
            <div className="p-4">
              <h3 className="font-bold text-lg">{season.name}</h3>
              <p className="text-gray-400 text-sm flex items-center gap-2 mt-1">
                <FaCalendarAlt />
                {season.air_date ? new Date(season.air_date).getFullYear() : 'TBA'}
              </p>
              <p className="text-gray-400 text-sm">
                {season.episode_count} episodes
              </p>
              {season.overview && (
                <p className="text-gray-300 text-sm mt-2 line-clamp-2">
                  {season.overview}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// EpisodeView component inside the same file
const EpisodeView = ({ seasonNumber, onBack }: { seasonNumber: number; onBack: () => void }) => {
  const { id } = useParams();
  
  const { data } = useTmdb<any>(
    `${TV_VIEW_ENDPOINT}/${id}/season/${seasonNumber}`,
    {},
    [id, seasonNumber]
  );

  if (!data) {
    return <p className="text-gray-400">Loading episodes...</p>;
  }

  return (
    <div className="p-6 space-y-6">
      <button
        onClick={onBack}
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
        {data.episodes?.map((episode: any) => (
          <div key={episode.id} className="flex gap-4 p-4 bg-gray-800 rounded-lg">
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