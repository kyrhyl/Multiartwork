import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { GalleryAlbumModel } from '@/lib/models/GalleryAlbum';
import { GalleryImageModel } from '@/lib/models/GalleryImage';

interface Params {
  params: Promise<{
    slug: string;
  }>;
}

/**
 * GET /api/gallery/albums/[slug]
 * Public endpoint to fetch a single album with its images
 */
export async function GET(request: NextRequest, { params }: Params) {
  try {
    const resolvedParams = await params;
    await connectDB();

    const album = await GalleryAlbumModel.findOne({ slug: resolvedParams.slug }).lean();

    if (!album) {
      return NextResponse.json(
        { success: false, error: { message: 'Album not found' } },
        { status: 404 }
      );
    }

    // Fetch images for this album
    const images = await GalleryImageModel.find({ albumId: album._id })
      .sort({ sortOrder: 1 })
      .lean();

    // Map database fields to API response fields
    const albumResponse = {
      ...album,
      _id: album._id.toString(),
      coverImage: album.coverImageUrl,
      order: album.sortOrder,
      images: images.map(img => ({
        ...img,
        _id: img._id.toString(),
        order: img.sortOrder,
      })),
    };

    return NextResponse.json({ success: true, album: albumResponse });
  } catch (error) {
    console.error('Error fetching album:', error);
    return NextResponse.json(
      { success: false, error: { message: 'Failed to fetch album' } },
      { status: 500 }
    );
  }
}
