import { MOVIE_ENDPOINT, TV_VIEW_ENDPOINT, type ReviewsResponse } from '@/core';
import { useTmdb } from '@/hooks';
import { useParams, useLocation } from 'react-router-dom';

export const ReviewsView = () => {
  const { id } = useParams();
  const location = useLocation();
  
  const isMovie = location.pathname.includes('/movie/'); // Changed from '/movies/' to '/movie/'
  const endpoint = isMovie ? MOVIE_ENDPOINT : TV_VIEW_ENDPOINT;
  
  const { data } = useTmdb<ReviewsResponse>(
    `${endpoint}/${id}/reviews`,
    {},
    [id, isMovie]
  );

  if (!data?.results?.length) {
    return (
      <div className="mt-6 space-y-4">
        <h2 className="text-2xl font-bold text-[#f0f4ef]">Reviews</h2>
        <p className="text-[#bfcc94] text-center">
          {!data ? 'Loading reviews...' : 'No reviews available.'}
        </p>
      </div>
    );
  }

  return (
    <div className="mt-6 space-y-4">
      <h2 className="text-2xl font-bold text-[#f0f4ef]">Reviews</h2>
      {data.results.slice(0, 5).map((review) => (
        <div key={review.id} className="bg-[#344966] p-5 rounded-xl shadow border border-[#0d1821]">
          <p className="text-sm text-[#bfcc94] mb-2">By {review.author}</p>
          <p className="text-[#f0f4ef] text-sm leading-relaxed line-clamp-6">{review.content}</p>
        </div>
      ))}
    </div>
  );
};