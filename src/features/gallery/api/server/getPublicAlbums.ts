import { connectDB } from '@/lib/db';
import { GalleryAlbumModel } from '@/lib/models/GalleryAlbum';

export async function getPublicAlbumsServer() {
  await connectDB();
  const albums = await GalleryAlbumModel.find({}).sort({ sortOrder: 1 }).lean();
  
  return albums.map((a: any) => ({
    _id: a._id.toString(),
    slug: a.slug,
    title: a.title,
    description: a.description ?? '',
    coverImageUrl: a.coverImageUrl ?? null,
    sortOrder: a.sortOrder ?? 0,
    serviceTags: a.serviceTags || [],
  }));
}
