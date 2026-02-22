import { PublicLayout } from '@/shared/layout/PublicLayout';
import { ServiceAlbums } from '@/features/services/ui/ServiceAlbums';
import { getSiteSettingsServer } from '@/features/settings/api/server/getSiteSettings';
import { getPublicAlbumsServer } from '@/features/gallery/api/server/getPublicAlbums';

export const metadata = {
  title: 'Our Services | Multi-Artworks & Signages',
  description: 'Explore our professional services and view our portfolio of completed projects.',
};

export default async function ServicesPage() {
  const [settings, albums] = await Promise.all([
    getSiteSettingsServer(),
    getPublicAlbumsServer(),
  ]);

  return (
    <PublicLayout>
      <div className="py-12 md:py-20">
        <div className="mx-auto max-w-[1280px] px-4 md:px-10">
          <div className="mb-10 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Services</h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Explore our professional services and view sample projects from our portfolio
            </p>
          </div>
          
          {settings.services && settings.services.length > 0 && (
            <ServiceAlbums 
              services={settings.services} 
              albums={albums} 
            />
          )}
        </div>
      </div>
    </PublicLayout>
  );
}
