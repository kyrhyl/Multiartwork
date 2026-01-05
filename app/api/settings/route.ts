import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { SiteSettingsModel } from '@/lib/models/SiteSettings';

/**
 * GET /api/settings
 * Public endpoint to fetch site settings
 */
export async function GET() {
  try {
    await connectDB();
    
    // Get the first (and only) settings document
    let settings = await SiteSettingsModel.findOne();
    
    // If no settings exist, return default values
    if (!settings) {
      settings = {
        companyName: 'Multi-Artworks & Signages',
        tagline: 'Your Vision, Our Expertise',
        heroTitle: 'Welcome to Multi-Artworks & Signages',
        heroSubtitle: 'Creating stunning visual experiences',
        heroImage: '',
        aboutText: '',
        services: [],
        contactEmail: '',
        contactPhone: '',
        contactAddress: '',
        socialLinks: {
          facebook: '',
          instagram: '',
          twitter: '',
          linkedin: '',
        },
      };
    }

    return NextResponse.json({ success: true, settings });
  } catch (error) {
    console.error('Error fetching settings:', error);
    return NextResponse.json(
      { success: false, error: { message: 'Failed to fetch settings' } },
      { status: 500 }
    );
  }
}
