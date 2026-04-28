import { MOVIE_ENDPOINT, type ReviewsResponse } from '@/core';
import { useTmdb } from '@/hooks';
import { useParams } from 'react-router-dom';

export const ReviewsView = () => {
  const { id } = useParams();
  const { data } = useTmdb<ReviewsResponse>(`${MOVIE_ENDPOINT}/${id}/reviews`, {}, []);

  if (!data) {
    return <p className="text-center text-[#f0f4ef]">Loading...</p>;
  }

  return (
    <section className="min-h-screen bg-[#0d1821] text-[#f0f4ef] space-y-6">
      <h2 className="text-2xl font-bold text-[#f0f4ef]">Reviews</h2>
      {!data.results.length && <p className="text-[#bfcc94] text-center">No reviews available.</p>}
      {data.results.slice(0, 5).map((review) => (
        <div key={review.id} className="bg-[#344966] p-5 rounded-xl shadow border border-[#0d1821]">
          <p className="text-sm text-[#bfcc94] mb-2">By {review.author}</p>
          <p className="text-[#f0f4ef] text-sm leading-relaxed line-clamp-6">{review.content}</p>
        </div>
      ))}
    </section>
  );
};