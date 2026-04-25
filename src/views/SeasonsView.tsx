import { TV_VIEW_ENDPOINT, IMAGE_BASE_URL } from '@/core/constants';
import type { TvDetailsResponse } from '@/core/types';
import { useTmdb } from '@/hooks';
import { FaCalendarAlt, FaTv } from 'react-icons/fa';
import { useParams, useNavigate } from 'react-router-dom';

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
            onClick={() => navigate(`/tv/${id}/seasons/${season.season_number}/episodes`)}
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