import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { GalleryImageModel } from '@/lib/models/GalleryImage';
import { z } from 'zod';

const imageSchema = z.object({
  albumId: z.string().min(1, 'Album ID is required'),
  imageUrl: z.string().url('Invalid image URL'),
  title: z.string().optional(),
  description: z.string().optional(),
  order: z.number().int().min(0).default(0),
});

interface Params {
  params: Promise<{
    id: string;
  }>;
}

/**
 * GET /api/admin/gallery/albums/[id]/images
 * Fetch all images for an album
 */
export async function GET(request: NextRequest, { params }: Params) {
  try {
    const resolvedParams = await params;
    await connectDB();

    const images = await GalleryImageModel.find({ albumId: resolvedParams.id })
      .sort({ order: 1 })
      .lean();

    return NextResponse.json({ success: true, images });
  } catch (error) {
    console.error('Error fetching images:', error);
    return NextResponse.json(
      { success: false, error: { message: 'Failed to fetch images' } },
      { status: 500 }
    );
  }
}

/**
 * POST /api/admin/gallery/albums/[id]/images
 * Add an image to an album
 */
export async function POST(request: NextRequest, { params }: Params) {
  try {
    const resolvedParams = await params;
    const body = await request.json();

    // Add albumId from params
    const dataWithAlbumId = { ...body, albumId: resolvedParams.id };

    // Validate input
    const validation = imageSchema.safeParse(dataWithAlbumId);
    if (!validation.success) {
      return NextResponse.json(
        { success: false, error: { message: 'Invalid input', issues: validation.error.issues } },
        { status: 400 }
      );
    }

    await connectDB();

    const image = await GalleryImageModel.create(validation.data);

    return NextResponse.json({ success: true, image }, { status: 201 });
  } catch (error) {
    console.error('Error creating image:', error);
    return NextResponse.json(
      { success: false, error: { message: 'Failed to add image' } },
      { status: 500 }
    );
  }
}
