import { connectDB } from '@/lib/db';
import { SiteSettingsModel } from '@/lib/models/SiteSettings';

interface Service {
  title: string;
  description: string;
  icon?: string;
}

export async function getSiteSettingsServer() {
  await connectDB();
  
  let settings = await SiteSettingsModel.findOne({}).lean();
  
  // Create default settings if none exist
  if (!settings) {
    settings = await SiteSettingsModel.create({
      heroTitle: 'Built to Last. Designed to Stand Out.',
      heroSubtitle: 'Premium signage solutions, large-format printing, and expert steel fabrication for businesses that demand visibility and durability.',
      aboutText: 'We combine industrial precision with creative design to deliver comprehensive branding solutions.',
      services: [
        { title: 'Signage Solutions', description: 'Custom signs, outdoor signage, and indoor displays', icon: '🎯' },
        { title: 'Large Format Printing', description: 'Banners, posters, and promotional materials', icon: '🖨️' },
        { title: 'Steel Fabrication', description: 'Custom metalwork and industrial solutions', icon: '⚙️' },
        { title: 'Awards & Recognition', description: 'Trophies, plaques, and corporate awards', icon: '🏆' },
      ],
      contactEmail: 'info@multiartworks.com',
      contactPhone: '+1 234 567 8900',
      socialLinks: [],
    });
  }

  // Normalize services to ensure they are objects with proper structure
  const normalizeServices = (services: any[]): Service[] => {
    if (!Array.isArray(services)) return [];
    
    return services.map((service: any, index: number) => {
      // If service is a string, convert to object
      if (typeof service === 'string') {
        const defaultIcons = ['🎯', '🖨️', '⚙️', '🏆', '🎨', '✨'];
        return {
          title: service,
          description: 'Professional ' + service.toLowerCase() + ' services',
          icon: defaultIcons[index % defaultIcons.length],
          imageUrl: '',
        };
      }
      // If service is already an object, ensure it has all required fields
      return {
        title: service.title || 'Service',
        description: service.description || 'Professional services',
        icon: service.icon || '✨',
        imageUrl: service.imageUrl || '',
      };
    });
  };

  return {
    heroTitle: settings.heroTitle,
    heroSubtitle: settings.heroSubtitle,
    heroImageUrl: settings.heroImageUrl || null,
    aboutText: settings.aboutText,
    services: normalizeServices(settings.services || []),
    contactEmail: settings.contactEmail,
    contactPhone: settings.contactPhone,
    socialLinks: settings.socialLinks || [],
    navigationItems: settings.navigationItems || [
      { label: 'Home', href: '/' },
      { label: 'Portfolio', href: '/gallery' },
      { label: 'Services', href: '/services' },
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
    ],
  };
}
