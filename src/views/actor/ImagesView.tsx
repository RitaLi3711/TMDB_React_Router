import { IMAGE_BASE_URL } from '@/core';
import { useTmdb } from '@/hooks';
import { useParams } from 'react-router-dom';

type PersonImagesResponse = {
  profiles: Array<{
    file_path: string;
  }>;
};

export const ImagesView = () => {
  const { id } = useParams();

  const { data } = useTmdb<PersonImagesResponse>(
    `https://api.themoviedb.org/3/person/${id}/images`,
    {},
    [id]
  );

  if (!data) {
    return (
      <p className="text-center text-gray-400 mt-6">
        Loading images...
      </p>
    );
  }

  if (!data.profiles?.length) {
    return (
      <p className="text-center text-gray-400 mt-6">
        No images available.
      </p>
    );
  }

  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold text-[#f0f4ef] mb-4">
        Images
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {data.profiles.map((img, i) => (
          <img
            key={i}
            src={`${IMAGE_BASE_URL}${img.file_path}`}
            className="rounded-lg object-cover w-full h-[300px]"
          />
        ))}
      </div>
    </div>
  );
};