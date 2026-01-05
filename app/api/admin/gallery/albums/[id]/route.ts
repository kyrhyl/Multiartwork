import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { GalleryAlbumModel } from '@/lib/models/GalleryAlbum';
import { GalleryImageModel } from '@/lib/models/GalleryImage';
import { z } from 'zod';

const albumSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z.string().min(1, 'Slug is required').regex(/^[a-z0-9-]+$/, 'Slug must be lowercase with hyphens only'),
  description: z.string().optional(),
  coverImage: z.string().optional(),
  order: z.number().int().min(0).default(0),
});

interface Params {
  params: Promise<{
    id: string;
  }>;
}

/**
 * GET /api/admin/gallery/albums/[id]
 * Fetch a single album by ID with its images
 */
export async function GET(request: NextRequest, { params }: Params) {
  try {
    const resolvedParams = await params;
    await connectDB();

    const album = await GalleryAlbumModel.findById(resolvedParams.id).lean();

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

/**
 * PUT /api/admin/gallery/albums/[id]
 * Update an album
 */
export async function PUT(request: NextRequest, { params }: Params) {
  try {
    const resolvedParams = await params;
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

    // Check if album exists
    const existingAlbum = await GalleryAlbumModel.findById(resolvedParams.id);
    if (!existingAlbum) {
      return NextResponse.json(
        { success: false, error: { message: 'Album not found' } },
        { status: 404 }
      );
    }

    // Check if slug is being changed and if it conflicts
    if (validation.data.slug !== existingAlbum.slug) {
      const slugConflict = await GalleryAlbumModel.findOne({ slug: validation.data.slug });
      if (slugConflict) {
        return NextResponse.json(
          { success: false, error: { message: 'An album with this slug already exists' } },
          { status: 400 }
        );
      }
    }

    const album = await GalleryAlbumModel.findByIdAndUpdate(resolvedParams.id, validation.data, {
      new: true,
      runValidators: true,
    });

    return NextResponse.json({ success: true, album });
  } catch (error) {
    console.error('Error updating album:', error);
    return NextResponse.json(
      { success: false, error: { message: 'Failed to update album' } },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/admin/gallery/albums/[id]
 * Delete an album and all its images
 */
export async function DELETE(request: NextRequest, { params }: Params) {
  try {
    const resolvedParams = await params;
    await connectDB();

    const album = await GalleryAlbumModel.findByIdAndDelete(resolvedParams.id);

    if (!album) {
      return NextResponse.json(
        { success: false, error: { message: 'Album not found' } },
        { status: 404 }
      );
    }

    // Delete all images in this album
    await GalleryImageModel.deleteMany({ albumId: resolvedParams.id });

    return NextResponse.json({ success: true, message: 'Album deleted successfully' });
  } catch (error) {
    console.error('Error deleting album:', error);
    return NextResponse.json(
      { success: false, error: { message: 'Failed to delete album' } },
      { status: 500 }
    );
  }
}
