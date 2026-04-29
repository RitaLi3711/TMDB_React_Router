import { IMAGE_BASE_URL, type PersonResponse } from '@/core';
import { useTmdb } from '@/hooks';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

export const CareerView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const { data: person } = useTmdb<PersonResponse>(
    `https://api.themoviedb.org/3/person/${id}`,
    { append_to_response: 'combined_credits' },
    [id]
  );

  if (!person?.combined_credits) {
    return (
      <p className="text-gray-400 mt-6 text-center">
        Loading...
      </p>
    );
  }

  const credits = [
    ...(person.combined_credits.cast || []),
    ...(person.combined_credits.crew || []),
  ];

  const handleClick = (item: any) => {
    navigate(`/${item.media_type}/${item.id}`, {
      state: { backgroundLocation: location },
    });
  };

  const getRole = (item: any) => {
    return item.character ?? item.job ?? '';
  };

  return (
    <div className="mt-6 space-y-4">
      <h2 className="text-xl font-bold text-[#f0f4ef]">
        Career ({credits.length})
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5">
        {credits.map((item) => (
          <button
            key={item.id}
            onClick={() => handleClick(item)}
            className="bg-gray-800 rounded-lg overflow-hidden text-left hover:scale-[1.03] transition-transform"
          >
            <img
              src={
                item.poster_path
                  ? `${IMAGE_BASE_URL}${item.poster_path}`
                  : '/placeholder.png'
              }
              className="w-full h-[240px] object-cover"
              alt={item.title || item.name}
            />
            <div className="p-2">
              <p className="text-white text-sm font-medium line-clamp-1">
                {item.title || item.name}
              </p>
              <p className="text-gray-400 text-xs line-clamp-1">
                {getRole(item)}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};