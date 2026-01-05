import { connectDB } from '@/lib/db';
import { GalleryAlbumModel } from '@/lib/models/GalleryAlbum';

export async function getPublicAlbumsServer() {
  await connectDB();
  const albums = await GalleryAlbumModel.find({}).sort({ sortOrder: 1 }).lean();
  
  return albums.map((a: any) => ({
    slug: a.slug,
    title: a.title,
    description: a.description ?? '',
    coverImageUrl: a.coverImageUrl ?? null,
  }));
}
