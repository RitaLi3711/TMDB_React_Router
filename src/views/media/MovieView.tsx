import { LinkGroup, Modal } from '@/components';
import { IMAGE_BASE_URL, MOVIE_ENDPOINT, TV_VIEW_ENDPOINT, ORIGINAL_IMAGE_BASE_URL, type MovieResponse, type TvDetailsResponse } from '@/core';
import { useTmdb } from '@/hooks';
import { FaCalendarAlt } from 'react-icons/fa';
import { Outlet, useNavigate, useParams, useLocation } from 'react-router-dom';

export const MovieView = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  
  const isMovie = location.pathname.includes('/movies/');
  const endpoint = isMovie ? MOVIE_ENDPOINT : TV_VIEW_ENDPOINT;
  
  const { data } = useTmdb<MovieResponse | TvDetailsResponse>(
    `${endpoint}/${id}`,
    { append_to_response: 'videos' },
    [id, isMovie]
  );

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  const title = isMovie ? (data as MovieResponse).title : (data as TvDetailsResponse).name;
  const date = isMovie ? (data as MovieResponse).release_date : (data as TvDetailsResponse).first_air_date;

  let options = [
    { label: 'Credits', to: 'credits' },
    { label: 'Trailers', to: 'trailers' },
    { label: 'Reviews', to: 'reviews' },
  ];
  
  if (!isMovie) {
    options = [
      { label: 'Seasons', to: 'seasons' },
      { label: 'Credits', to: 'credits' },
      { label: 'Trailers', to: 'trailers' },
      { label: 'Reviews', to: 'reviews' },
    ];
  }

  const handleClose = () => {
    // Navigate directly to the category page, not back
    if (isMovie) {
      navigate('/movies/category/now_playing');
    } else {
      navigate('/tv/category/airing_today');
    }
  };
  
  return (
    <Modal onClose={handleClose}>
      <div className="p-6 space-y-6">
        <div
          className="h-[420px] bg-cover bg-center rounded-2xl"
          style={{
            backgroundImage: `url(${ORIGINAL_IMAGE_BASE_URL}${data.backdrop_path})`,
          }}
        />
        <div className="flex gap-8">
          <img 
            className="w-[220px] h-[330px] object-cover rounded-xl" 
            src={`${IMAGE_BASE_URL}${data.poster_path}`} 
            alt={title} 
          />
          <div className="flex-1 space-y-4">
            <h1 className="text-3xl font-bold">{title}</h1>
            <p className="text-gray-400 flex items-center gap-2">
              <FaCalendarAlt />
              {date || 'Date TBA'}
            </p>
            <p className="text-gray-300">{data.overview}</p>
            <LinkGroup options={options} />
          </div>
        </div>
        <Outlet />
      </div>
    </Modal>
  );
};