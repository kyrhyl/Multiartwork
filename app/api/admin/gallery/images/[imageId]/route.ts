import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { GalleryImageModel } from '@/lib/models/GalleryImage';
import { z } from 'zod';

const imageUpdateSchema = z.object({
  caption: z.string().optional(),
  altText: z.string().optional(),
  order: z.number().int().min(0).optional(),
});

interface Params {
  params: Promise<{
    imageId: string;
  }>;
}

/**
 * PUT /api/admin/gallery/images/[imageId]
 * Update an image
 */
export async function PUT(request: NextRequest, { params }: Params) {
  try {
    const resolvedParams = await params;
    const body = await request.json();

    // Validate input
    const validation = imageUpdateSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { success: false, error: { message: 'Invalid input', issues: validation.error.issues } },
        { status: 400 }
      );
    }

    await connectDB();

    // Map API fields to database fields
    const updateData: any = {};
    if (validation.data.caption !== undefined) updateData.caption = validation.data.caption;
    if (validation.data.altText !== undefined) updateData.altText = validation.data.altText;
    if (validation.data.order !== undefined) updateData.sortOrder = validation.data.order;

    const image = await GalleryImageModel.findByIdAndUpdate(resolvedParams.imageId, updateData, {
      new: true,
      runValidators: true,
    }).lean();

    if (!image) {
      return NextResponse.json(
        { success: false, error: { message: 'Image not found' } },
        { status: 404 }
      );
    }

    // Map response
    const imageResponse = {
      ...image,
      _id: image._id.toString(),
      order: image.sortOrder,
    };

    return NextResponse.json({ success: true, image: imageResponse });
  } catch (error) {
    console.error('Error updating image:', error);
    return NextResponse.json(
      { success: false, error: { message: 'Failed to update image' } },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/admin/gallery/images/[imageId]
 * Delete an image
 */
export async function DELETE(request: NextRequest, { params }: Params) {
  try {
    const resolvedParams = await params;
    await connectDB();

    const image = await GalleryImageModel.findByIdAndDelete(resolvedParams.imageId);

    if (!image) {
      return NextResponse.json(
        { success: false, error: { message: 'Image not found' } },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: 'Image deleted successfully' });
  } catch (error) {
    console.error('Error deleting image:', error);
    return NextResponse.json(
      { success: false, error: { message: 'Failed to delete image' } },
      { status: 500 }
    );
  }
}
