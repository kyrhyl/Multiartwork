import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { GalleryImageModel } from '@/lib/models/GalleryImage';
import { z } from 'zod';

const imageSchema = z.object({
  albumId: z.string().min(1, 'Album ID is required'),
  imageUrl: z.string().url('Invalid image URL'),
  caption: z.string().optional(),
  altText: z.string().optional(),
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
      .sort({ sortOrder: 1 })
      .lean();

    // Map database fields to API response
    const imagesResponse = images.map(img => ({
      ...img,
      _id: img._id.toString(),
      order: img.sortOrder,
    }));

    return NextResponse.json({ success: true, images: imagesResponse });
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

    // Map fields to database schema
    const imageData = {
      albumId: validation.data.albumId,
      imageUrl: validation.data.imageUrl,
      thumbUrl: validation.data.imageUrl, // Use same URL for thumbnail
      caption: validation.data.caption || '',
      altText: validation.data.altText || '',
      sortOrder: validation.data.order,
    };

    const image = await GalleryImageModel.create(imageData);

    // Map response back
    const imageResponse = {
      ...image.toObject(),
      _id: image._id.toString(),
      order: image.sortOrder,
    };

    return NextResponse.json({ success: true, image: imageResponse }, { status: 201 });
  } catch (error) {
    console.error('Error creating image:', error);
    return NextResponse.json(
      { success: false, error: { message: 'Failed to add image' } },
      { status: 500 }
    );
  }
}
