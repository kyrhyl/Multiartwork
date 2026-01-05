import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { SiteSettingsModel } from '@/lib/models/SiteSettings';
import { z } from 'zod';

// Validation schema for site settings
const settingsSchema = z.object({
  companyName: z.string().min(1, 'Company name is required'),
  tagline: z.string().optional(),
  heroTitle: z.string().optional(),
  heroSubtitle: z.string().optional(),
  heroImage: z.string().optional(),
  aboutText: z.string().optional(),
  services: z.array(z.object({
    title: z.string(),
    description: z.string(),
    icon: z.string().optional(),
  })).optional(),
  contactEmail: z.string().email().optional().or(z.literal('')),
  contactPhone: z.string().optional(),
  contactAddress: z.string().optional(),
  socialLinks: z.object({
    facebook: z.string().optional(),
    instagram: z.string().optional(),
    twitter: z.string().optional(),
    linkedin: z.string().optional(),
  }).optional(),
});

/**
 * PUT /api/admin/settings
 * Update site settings (admin only)
 */
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    
    // Validate input
    const validation = settingsSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { success: false, error: { message: 'Invalid input', issues: validation.error.issues } },
        { status: 400 }
      );
    }

    await connectDB();
    
    // Update or create settings (there should only be one document)
    const settings = await SiteSettingsModel.findOneAndUpdate(
      {}, // Match any document (there's only one)
      validation.data,
      { 
        new: true, // Return the updated document
        upsert: true, // Create if doesn't exist
        runValidators: true,
      }
    );

    return NextResponse.json({ success: true, settings });
  } catch (error) {
    console.error('Error updating settings:', error);
    return NextResponse.json(
      { success: false, error: { message: 'Failed to update settings' } },
      { status: 500 }
    );
  }
}
