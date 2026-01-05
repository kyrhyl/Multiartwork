import { AlbumImagesContainer } from '@/features/gallery/containers/AlbumImagesContainer';

interface PageProps {
  params: {
    id: string;
  };
}

export default function AlbumImagesPage({ params }: PageProps) {
  return <AlbumImagesContainer albumId={params.id} />;
}
