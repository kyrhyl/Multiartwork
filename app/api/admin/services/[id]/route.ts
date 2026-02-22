import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { SiteSettingsModel } from '@/lib/models/SiteSettings';
import { GalleryAlbumModel } from '@/lib/models/GalleryAlbum';
import { verifyAdminAuth } from '@/lib/auth';
import mongoose from 'mongoose';
import { z } from 'zod';

const serviceSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  icon: z.string().optional(),
  imageUrl: z.string().optional(),
  linkedAlbumIds: z.array(z.string()).optional(), // For Method B: Service-to-Album association
});

interface Params {
  params: Promise<{
    id: string;
  }>;
}

/**
 * PUT /api/admin/services/[id]
 * Update a service (id is the service title since services don't have IDs)
 */
export async function PUT(request: NextRequest, { params }: Params) {
  const auth = await verifyAdminAuth(request);
  if (!auth) {
    return NextResponse.json(
      { success: false, error: { message: 'Unauthorized' } },
      { status: 401 }
    );
  }

  try {
    const resolvedParams = await params;
    const serviceTitle = decodeURIComponent(resolvedParams.id);
    const body = await request.json();

    const validation = serviceSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { success: false, error: { message: 'Invalid input', issues: validation.error.issues } },
        { status: 400 }
      );
    }

    await connectDB();

    const settings = await SiteSettingsModel.findOne({});
    
    if (!settings) {
      return NextResponse.json(
        { success: false, error: { message: 'Settings not found' } },
        { status: 404 }
      );
    }

    // Find the service by title
    const serviceIndex = settings.services.findIndex(
      (s: any) => s.title === serviceTitle
    );

    if (serviceIndex === -1) {
      return NextResponse.json(
        { success: false, error: { message: 'Service not found' } },
        { status: 404 }
      );
    }

    // Check if new title conflicts with another service
    if (validation.data.title !== serviceTitle) {
      const existingService = settings.services.find(
        (s: any) => s.title.toLowerCase() === validation.data.title.toLowerCase()
      );
      
      if (existingService) {
        return NextResponse.json(
          { success: false, error: { message: 'A service with this title already exists' } },
          { status: 400 }
        );
      }

      // Update service tags in all albums if title changed
      await GalleryAlbumModel.updateMany(
        { serviceTags: serviceTitle },
        { $set: { 'serviceTags.$': validation.data.title } }
      );
    }

    // Update the service
    settings.services[serviceIndex] = {
      title: validation.data.title,
      description: validation.data.description,
      icon: validation.data.icon || settings.services[serviceIndex].icon,
      imageUrl: validation.data.imageUrl !== undefined 
        ? validation.data.imageUrl 
        : settings.services[serviceIndex].imageUrl,
    };

    await settings.save();

    // Handle Method B: Service-to-Album association
    if (validation.data.linkedAlbumIds !== undefined) {
      const serviceTag = validation.data.title;
      
      // Remove this service tag from all albums
      await GalleryAlbumModel.updateMany(
        { serviceTags: serviceTag },
        { $pull: { serviceTags: serviceTag } }
      );
      
      // Add service tag to selected albums
      if (validation.data.linkedAlbumIds.length > 0) {
        // Convert string IDs to MongoDB ObjectIds for proper matching
        const objectIds = validation.data.linkedAlbumIds.map(id => 
          new mongoose.Types.ObjectId(id)
        );
        
        await GalleryAlbumModel.updateMany(
          { _id: { $in: objectIds } },
          { $addToSet: { serviceTags: serviceTag } }
        );
      }
    }

    // Get updated album count
    const albums = await GalleryAlbumModel.find({
      serviceTags: validation.data.title,
    }).lean();

    return NextResponse.json({
      success: true,
      service: {
        ...settings.services[serviceIndex].toObject(),
        albumCount: albums.length,
        linkedAlbums: albums.map(album => ({
          _id: album._id.toString(),
          title: album.title,
          slug: album.slug,
          coverImageUrl: album.coverImageUrl,
        })),
      },
    });
  } catch (error) {
    console.error('Error updating service:', error);
    return NextResponse.json(
      { success: false, error: { message: 'Failed to update service' } },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/admin/services/[id]
 * Delete a service
 */
export async function DELETE(request: NextRequest, { params }: Params) {
  const auth = await verifyAdminAuth(request);
  if (!auth) {
    return NextResponse.json(
      { success: false, error: { message: 'Unauthorized' } },
      { status: 401 }
    );
  }

  try {
    const resolvedParams = await params;
    const serviceTitle = decodeURIComponent(resolvedParams.id);

    await connectDB();

    const settings = await SiteSettingsModel.findOne({});
    
    if (!settings) {
      return NextResponse.json(
        { success: false, error: { message: 'Settings not found' } },
        { status: 404 }
      );
    }

    // Check if service exists
    const serviceExists = settings.services.some(
      (s: any) => s.title === serviceTitle
    );

    if (!serviceExists) {
      return NextResponse.json(
        { success: false, error: { message: 'Service not found' } },
        { status: 404 }
      );
    }

    // Remove service from all albums' serviceTags
    await GalleryAlbumModel.updateMany(
      { serviceTags: serviceTitle },
      { $pull: { serviceTags: serviceTitle } }
    );

    // Remove service from settings
    settings.services = settings.services.filter(
      (s: any) => s.title !== serviceTitle
    );

    await settings.save();

    return NextResponse.json({
      success: true,
      message: 'Service deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting service:', error);
    return NextResponse.json(
      { success: false, error: { message: 'Failed to delete service' } },
      { status: 500 }
    );
  }
}
