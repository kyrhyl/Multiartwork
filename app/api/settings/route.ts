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
    let settings = await SiteSettingsModel.findOne().lean();
    
    // If no settings exist, return default values
    if (!settings) {
      return NextResponse.json({
        success: true,
        settings: {
          heroTitle: 'Welcome to Multi-Artworks & Signages',
          heroSubtitle: 'Creating stunning visual experiences',
          heroImage: '',
          aboutText: '',
          services: [],
          contactEmail: '',
          contactPhone: '',
          socialLinks: {},
          navigationItems: [
            { label: 'Home', href: '/' },
            { label: 'Gallery', href: '/gallery' },
            { label: 'Blog', href: '/blog' },
            { label: 'About', href: '/about' },
            { label: 'Contact', href: '/contact' },
          ],
        },
      });
    }

    // Map database fields to API response fields
    const settingsResponse = {
      ...settings,
      _id: settings._id.toString(),
      heroImage: settings.heroImageUrl || '',
      socialLinks: settings.socialLinks?.reduce((acc: any, link: any) => {
        acc[link.platform] = link.url;
        return acc;
      }, {}) || {},
    };

    return NextResponse.json({ success: true, settings: settingsResponse });
  } catch (error) {
    console.error('Error fetching settings:', error);
    return NextResponse.json(
      { success: false, error: { message: 'Failed to fetch settings' } },
      { status: 500 }
    );
  }
}
