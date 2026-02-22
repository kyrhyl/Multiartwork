import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { SiteSettingsModel } from '@/lib/models/SiteSettings';
import { GalleryAlbumModel } from '@/lib/models/GalleryAlbum';
import { verifyAdminAuth } from '@/lib/auth';
import { z } from 'zod';

const serviceSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  icon: z.string().optional(),
  imageUrl: z.string().optional(),
  linkedAlbumIds: z.array(z.string()).optional(), // For album associations
});

/**
 * GET /api/admin/services
 * Fetch all services with their linked albums count
 */
export async function GET(request: NextRequest) {
  const auth = await verifyAdminAuth(request);
  if (!auth) {
    return NextResponse.json(
      { success: false, error: { message: 'Unauthorized' } },
      { status: 401 }
    );
  }

  try {
    await connectDB();

    const settings = await SiteSettingsModel.findOne({}).lean();
    
    if (!settings) {
      return NextResponse.json({ success: true, services: [] });
    }

    // Get all albums to count how many are linked to each service
    const albums = await GalleryAlbumModel.find({}).lean();
    
    const servicesWithCounts = (settings.services || []).map((service: any) => {
      const linkedAlbums = albums.filter(album => 
        album.serviceTags && album.serviceTags.includes(service.title)
      );
      
      return {
        title: service.title,
        description: service.description,
        icon: service.icon,
        imageUrl: service.imageUrl,
        albumCount: linkedAlbums.length,
        linkedAlbums: linkedAlbums.map(album => ({
          _id: album._id.toString(),
          title: album.title,
          slug: album.slug,
          coverImageUrl: album.coverImageUrl,
        })),
      };
    });

    return NextResponse.json({ 
      success: true, 
      services: servicesWithCounts 
    });
  } catch (error) {
    console.error('Error fetching services:', error);
    return NextResponse.json(
      { success: false, error: { message: 'Failed to fetch services' } },
      { status: 500 }
    );
  }
}

/**
 * POST /api/admin/services
 * Create a new service
 */
export async function POST(request: NextRequest) {
  const auth = await verifyAdminAuth(request);
  if (!auth) {
    return NextResponse.json(
      { success: false, error: { message: 'Unauthorized' } },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();

    const validation = serviceSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { success: false, error: { message: 'Invalid input', issues: validation.error.issues } },
        { status: 400 }
      );
    }

    await connectDB();

    let settings = await SiteSettingsModel.findOne({});
    
    if (!settings) {
      settings = await SiteSettingsModel.create({
        heroTitle: 'Built to Last. Designed to Stand Out.',
        heroSubtitle: 'Premium signage solutions and expert fabrication.',
        aboutText: 'We are a full-service creative studio.',
        services: [],
        contactEmail: 'info@example.com',
        contactPhone: '+1 234 567 8900',
        socialLinks: [],
      });
    }

    // Check if service with same title already exists
    const existingService = settings.services.find(
      (s: any) => s.title.toLowerCase() === validation.data.title.toLowerCase()
    );
    
    if (existingService) {
      return NextResponse.json(
        { success: false, error: { message: 'A service with this title already exists' } },
        { status: 400 }
      );
    }

    // Add new service
    settings.services.push({
      title: validation.data.title,
      description: validation.data.description,
      icon: validation.data.icon || '',
      imageUrl: validation.data.imageUrl || '',
    });

    await settings.save();

    const newService = settings.services[settings.services.length - 1];
    const serviceTag = validation.data.title;

    // Handle album associations for new service
    if (validation.data.linkedAlbumIds && validation.data.linkedAlbumIds.length > 0) {
      const mongoose = await import('mongoose');
      const objectIds = validation.data.linkedAlbumIds.map(id => 
        new mongoose.Types.ObjectId(id)
      );
      
      await GalleryAlbumModel.updateMany(
        { _id: { $in: objectIds } },
        { $addToSet: { serviceTags: serviceTag } }
      );
    }

    // Get updated album count
    const albums = await GalleryAlbumModel.find({
      serviceTags: serviceTag,
    }).lean();

    return NextResponse.json(
      { 
        success: true, 
        service: {
          ...newService.toObject(),
          albumCount: albums.length,
          linkedAlbums: albums.map(album => ({
            _id: album._id.toString(),
            title: album.title,
            slug: album.slug,
            coverImageUrl: album.coverImageUrl,
          })),
        }
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating service:', error);
    return NextResponse.json(
      { success: false, error: { message: 'Failed to create service' } },
      { status: 500 }
    );
  }
}
