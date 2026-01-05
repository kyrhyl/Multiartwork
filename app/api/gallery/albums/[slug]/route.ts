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
      .sort({ order: 1 })
      .lean();

    return NextResponse.json({
      success: true,
      album: {
        ...album,
        images,
      },
    });
  } catch (error) {
    console.error('Error fetching album:', error);
    return NextResponse.json(
      { success: false, error: { message: 'Failed to fetch album' } },
      { status: 500 }
    );
  }
}
