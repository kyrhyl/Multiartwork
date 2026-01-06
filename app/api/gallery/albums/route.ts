import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { GalleryAlbumModel } from '@/lib/models/GalleryAlbum';

/**
 * GET /api/gallery/albums
 * Public endpoint to fetch all gallery albums
 */
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const albums = await GalleryAlbumModel.find()
      .sort({ sortOrder: 1 })
      .lean();

    // Map database fields to API response fields
    const albumsResponse = albums.map(album => ({
      ...album,
      _id: album._id.toString(),
      coverImage: album.coverImageUrl,
      order: album.sortOrder,
    }));

    return NextResponse.json({ success: true, albums: albumsResponse });
  } catch (error) {
    console.error('Error fetching albums:', error);
    return NextResponse.json(
      { success: false, error: { message: 'Failed to fetch albums' } },
      { status: 500 }
    );
  }
}
