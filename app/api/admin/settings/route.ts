import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { SiteSettingsModel } from '@/lib/models/SiteSettings';
import { z } from 'zod';

// Validation schema for site settings
const settingsSchema = z.object({
  heroTitle: z.string().optional(),
  heroSubtitle: z.string().optional(),
  heroImage: z.string().optional(),
  aboutText: z.string().optional(),
  services: z.array(z.object({
    title: z.string().min(1, 'Service title is required'),
    description: z.string().min(1, 'Service description is required'),
    icon: z.string().optional(),
  })).optional(),
  contactEmail: z.union([z.string().email(), z.literal('')]).optional(),
  contactPhone: z.string().optional(),
  socialLinks: z.object({
    facebook: z.string().optional(),
    instagram: z.string().optional(),
    twitter: z.string().optional(),
    linkedin: z.string().optional(),
  }).optional(),
  navigationItems: z.array(z.object({
    label: z.string().min(1, 'Navigation label is required'),
    href: z.string().min(1, 'Navigation href is required'),
  })).optional(),
});

/**
 * PUT /api/admin/settings
 * Update site settings (admin only)
 */
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    
    console.log('Received settings data:', JSON.stringify(body, null, 2));
    
    // Validate input
    const validation = settingsSchema.safeParse(body);
    if (!validation.success) {
      console.error('Validation failed:', validation.error.issues);
      return NextResponse.json(
        { success: false, error: { message: 'Invalid input', issues: validation.error.issues } },
        { status: 400 }
      );
    }

    // Map API fields to database fields (only include defined values)
    const updateData: any = {};
    
    if (validation.data.heroTitle !== undefined) updateData.heroTitle = validation.data.heroTitle;
    if (validation.data.heroSubtitle !== undefined) updateData.heroSubtitle = validation.data.heroSubtitle;
    if (validation.data.heroImage !== undefined) updateData.heroImageUrl = validation.data.heroImage;
    if (validation.data.aboutText !== undefined) updateData.aboutText = validation.data.aboutText;
    if (validation.data.contactEmail !== undefined) updateData.contactEmail = validation.data.contactEmail;
    if (validation.data.contactPhone !== undefined) updateData.contactPhone = validation.data.contactPhone;

    // Handle services - store as objects
    if (validation.data.services !== undefined) {
      updateData.services = validation.data.services;
    }

    // Handle social links - convert from object to array format
    if (validation.data.socialLinks) {
      updateData.socialLinks = Object.entries(validation.data.socialLinks)
        .filter(([_, url]) => url)
        .map(([platform, url]) => ({ platform, url: url as string }));
    }

    // Handle navigation items
    if (validation.data.navigationItems) {
      updateData.navigationItems = validation.data.navigationItems;
    }
    
    // Update or create settings (there should only be one document)
    const settings = await SiteSettingsModel.findOneAndUpdate(
      {}, // Match any document (there's only one)
      updateData,
      { 
        new: true, // Return the updated document
        upsert: true, // Create if doesn't exist
        runValidators: true,
      }
    ).lean();

    // Map response back to API format
    const settingsResponse: any = {
      ...settings,
      _id: settings!._id.toString(),
      heroImage: settings!.heroImageUrl,
      socialLinks: settings!.socialLinks?.reduce((acc: any, link: any) => {
        acc[link.platform] = link.url;
        return acc;
      }, {}) || {},
    };

    return NextResponse.json({ success: true, settings: settingsResponse });
  } catch (error) {
    console.error('Error updating settings:', error);
    return NextResponse.json(
      { success: false, error: { message: 'Failed to update settings' } },
      { status: 500 }
    );
  }
}
