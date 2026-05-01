import { ImageGrid } from '@/components';
import { IMAGE_BASE_URL, type ImageCell } from '@/core';
import { useTmdb } from '@/hooks';
import { useParams } from 'react-router-dom';

type PersonImagesResponse = {
  profiles: Array<{ file_path: string }>;
};

export const ImagesView = () => {
  const { id } = useParams();

  const { data } = useTmdb<PersonImagesResponse>(
    `https://api.themoviedb.org/3/person/${id}/images`,
    {},
    [id]
  );

  if (!data) return <p className="text-center text-gray-400 mt-6">Loading images...</p>;
  if (!data.profiles?.length) return <p className="text-center text-gray-400 mt-6">No images available.</p>;

  const gridData: ImageCell[] = data.profiles.map((img, index) => ({
    id: index,
    imageUrl: `${IMAGE_BASE_URL}${img.file_path}`,
    primaryText: '',
    secondaryText: '',
  }));

  return (
    <>
      <h2 className="text-xl font-bold text-[#f0f4ef] mb-4">Images</h2>
      <ImageGrid results={gridData} />
    </>
  );
};