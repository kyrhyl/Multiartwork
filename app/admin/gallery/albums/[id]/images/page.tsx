import { AlbumImagesContainer } from '@/features/gallery/containers/AlbumImagesContainer';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function AlbumImagesPage({ params }: PageProps) {
  const { id } = await params;
  return <AlbumImagesContainer albumId={id} />;
}
