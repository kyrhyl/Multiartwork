import { connectDB } from '@/lib/db';
import { SiteSettingsModel } from '@/lib/models/SiteSettings';

export async function getSiteSettingsServer() {
  await connectDB();
  
  let settings = await SiteSettingsModel.findOne({}).lean();
  
  // Create default settings if none exist
  if (!settings) {
    settings = await SiteSettingsModel.create({
      heroTitle: 'Built to Last. Designed to Stand Out.',
      heroSubtitle: 'Premium signage solutions, large-format printing, and expert steel fabrication for businesses that demand visibility and durability.',
      aboutText: 'We combine industrial precision with creative design to deliver comprehensive branding solutions.',
      services: ['Signage Solutions', 'Large Format Printing', 'Steel Fabrication', 'Awards & Recognition'],
      contactEmail: 'info@multiartworks.com',
      contactPhone: '+1 234 567 8900',
      socialLinks: [],
    });
  }

  return {
    heroTitle: settings.heroTitle,
    heroSubtitle: settings.heroSubtitle,
    heroImageUrl: settings.heroImageUrl || null,
    aboutText: settings.aboutText,
    services: settings.services || [],
    contactEmail: settings.contactEmail,
    contactPhone: settings.contactPhone,
    socialLinks: settings.socialLinks || [],
  };
}
