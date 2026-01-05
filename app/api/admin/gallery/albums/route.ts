import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { GalleryAlbumModel } from '@/lib/models/GalleryAlbum';
import { z } from 'zod';

const albumSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z.string().min(1, 'Slug is required').regex(/^[a-z0-9-]+$/, 'Slug must be lowercase with hyphens only'),
  description: z.string().optional(),
  coverImage: z.string().optional(),
  order: z.number().int().min(0).default(0),
});

/**
 * GET /api/admin/gallery/albums
 * Fetch all albums for admin
 */
export async function GET() {
  try {
    await connectDB();

    const albums = await GalleryAlbumModel.find().sort({ order: 1 }).lean();

    return NextResponse.json({ success: true, albums });
  } catch (error) {
    console.error('Error fetching albums:', error);
    return NextResponse.json(
      { success: false, error: { message: 'Failed to fetch albums' } },
      { status: 500 }
    );
  }
}

/**
 * POST /api/admin/gallery/albums
 * Create a new album
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const validation = albumSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { success: false, error: { message: 'Invalid input', issues: validation.error.issues } },
        { status: 400 }
      );
    }

    await connectDB();

    // Check if slug already exists
    const existingAlbum = await GalleryAlbumModel.findOne({ slug: validation.data.slug });
    if (existingAlbum) {
      return NextResponse.json(
        { success: false, error: { message: 'An album with this slug already exists' } },
        { status: 400 }
      );
    }

    const album = await GalleryAlbumModel.create(validation.data);

    return NextResponse.json({ success: true, album }, { status: 201 });
  } catch (error) {
    console.error('Error creating album:', error);
    return NextResponse.json(
      { success: false, error: { message: 'Failed to create album' } },
      { status: 500 }
    );
  }
}
