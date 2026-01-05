import { PublicLayout } from '@/shared/layout/PublicLayout';
import { AlbumGrid } from '@/features/gallery/ui/AlbumGrid';
import { getPublicAlbumsServer } from '@/features/gallery/api/server/getPublicAlbums';

export const metadata = {
  title: 'Gallery | Multi-Artworks & Signages',
  description: 'Browse our portfolio of completed projects showcasing precision engineering and creative design.',
};

export default async function GalleryPage() {
  const albums = await getPublicAlbumsServer();

  return (
    <PublicLayout>
      <AlbumGrid albums={albums} />
    </PublicLayout>
  );
}
