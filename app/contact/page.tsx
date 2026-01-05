import { PublicLayout } from '@/shared/layout/PublicLayout';
import { getSiteSettingsServer } from '@/features/settings/api/server/getSiteSettings';

export const metadata = {
  title: 'Contact | Multi-Artworks & Signages',
  description: 'Get in touch with us for quotes and inquiries.',
};

export default async function ContactPage() {
  const settings = await getSiteSettingsServer();

  return (
    <PublicLayout>
      <div className="mx-auto max-w-[1280px] px-4 md:px-10 py-12 md:py-20">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
          
          <div className="grid md:grid-cols-2 gap-8 mt-8">
            <div>
              <h2 className="text-xl font-semibold mb-4">Get in Touch</h2>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Email</p>
                  <a href={`mailto:${settings.contactEmail}`} className="text-primary font-medium hover:underline">
                    {settings.contactEmail}
                  </a>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Phone</p>
                  <a href={`tel:${settings.contactPhone}`} className="text-primary font-medium hover:underline">
                    {settings.contactPhone}
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-[#1a2233] p-6 rounded-xl border border-gray-200 dark:border-gray-800">
              <h3 className="font-semibold mb-2">Request a Quote</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Contact us via email or phone to discuss your project requirements.
              </p>
              <a
                href={`mailto:${settings.contactEmail}?subject=Quote Request`}
                className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
              >
                Send Email
              </a>
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
