import { EditAlbumContainer } from '@/features/gallery/containers/EditAlbumContainer';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditAlbumPage({ params }: PageProps) {
  const { id } = await params;
  return <EditAlbumContainer albumId={id} />;
}
