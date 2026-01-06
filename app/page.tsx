import { PublicLayout } from '@/shared/layout/PublicLayout';
import { HeroSection } from '@/features/settings/ui/HeroSection';
import { AlbumGrid } from '@/features/gallery/ui/AlbumGrid';
import { PostList } from '@/features/posts/ui/PostList';
import { getSiteSettingsServer } from '@/features/settings/api/server/getSiteSettings';
import { getPublicAlbumsServer } from '@/features/gallery/api/server/getPublicAlbums';
import { getPublishedPostsServer } from '@/features/posts/api/server/getPublishedPosts';

export default async function HomePage() {
  const [settings, albums, posts] = await Promise.all([
    getSiteSettingsServer(),
    getPublicAlbumsServer(),
    getPublishedPostsServer(),
  ]);

  const featuredAlbums = albums.slice(0, 3);
  const recentPosts = posts.slice(0, 3);

  return (
    <PublicLayout>
      <HeroSection
        title={settings.heroTitle}
        subtitle={settings.heroSubtitle}
        imageUrl={settings.heroImageUrl}
      />
      
      {featuredAlbums.length > 0 && <AlbumGrid albums={featuredAlbums} />}
      
      {recentPosts.length > 0 && <PostList posts={recentPosts} />}
      
      {/* Services Section */}
      {settings.services && settings.services.length > 0 && (
        <section className="py-12 md:py-20 bg-white dark:bg-[#1a2233]">
          <div className="mx-auto max-w-[1280px] px-4 md:px-10">
            <div className="mb-10">
              <h2 className="text-3xl md:text-4xl font-bold leading-tight tracking-tight mb-4">Our Expertise</h2>
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                {settings.aboutText}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {settings.services.map((service: any, idx: number) => (
                <div
                  key={idx}
                  className="p-6 rounded-xl bg-gray-50 dark:bg-[#101622] border border-gray-200 dark:border-gray-800 hover:border-primary transition-colors"
                >
                  <h3 className="font-semibold text-lg mb-2">
                    {typeof service === 'string' ? service : service.title}
                  </h3>
                  {typeof service === 'object' && service.description && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                      {service.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </PublicLayout>
  );
}
