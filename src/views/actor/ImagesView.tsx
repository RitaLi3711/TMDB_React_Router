import { ImageGrid } from '@/components';
import { IMAGE_BASE_URL, PERSON_ENDPOINT, type PersonImagesResponse } from '@/core';import { useTmdb } from '@/hooks';
import { useParams } from 'react-router-dom';

export const ImagesView = () => {
  const { id } = useParams();

  const { data } = useTmdb<PersonImagesResponse>(
    `${PERSON_ENDPOINT}/${id}/images`,
    {},
    [id]
  );

  if (!data) return <p className="text-center text-gray-400 mt-6">Loading images...</p>;
  if (!data.profiles?.length) return <p className="text-center text-gray-400 mt-6">No images available.</p>;

  return (
    <>
      <h2 className="text-xl font-bold text-[#f0f4ef] mb-4">Images</h2>
      <ImageGrid
        results={data.profiles.map((img, index) => ({
          id: index,
          imageUrl: `${IMAGE_BASE_URL}${img.file_path}`,
          primaryText: '',
        }))}
      />
    </>
  );
};