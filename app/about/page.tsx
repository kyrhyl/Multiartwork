import { PublicLayout } from '@/shared/layout/PublicLayout';
import { getSiteSettingsServer } from '@/features/settings/api/server/getSiteSettings';

export const metadata = {
  title: 'About | Multi-Artworks & Signages',
  description: 'Learn more about our company and services.',
};

export default async function AboutPage() {
  const settings = await getSiteSettingsServer();

  return (
    <PublicLayout>
      <div className="mx-auto max-w-[1280px] px-4 md:px-10 py-12 md:py-20">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About Us</h1>
          
          <div className="prose prose-lg max-w-none space-y-4 text-gray-700 dark:text-gray-300">
            <p className="text-xl leading-relaxed">{settings.aboutText}</p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">Our Services</h2>
            <ul className="space-y-2">
              {settings.services.map((service: string, idx: number) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-primary mt-1">✓</span>
                  <span>{service}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
