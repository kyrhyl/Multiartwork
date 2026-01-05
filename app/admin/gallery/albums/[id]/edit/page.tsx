import { EditAlbumContainer } from '@/features/gallery/containers/EditAlbumContainer';

interface PageProps {
  params: {
    id: string;
  };
}

export default function EditAlbumPage({ params }: PageProps) {
  return <EditAlbumContainer albumId={params.id} />;
}
