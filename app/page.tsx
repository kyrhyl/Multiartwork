import { PublicLayout } from '@/shared/layout/PublicLayout';
import { HeroSection } from '@/features/settings/ui/HeroSection';
import { AlbumGrid } from '@/features/gallery/ui/AlbumGrid';
import { PostList } from '@/features/posts/ui/PostList';
import { ServiceAlbums } from '@/features/services/ui/ServiceAlbums';
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
      
      {/* Services Section with Sample Portfolios - Now First */}
      {settings.services && settings.services.length > 0 && (
        <section className="py-12 md:py-20 bg-white dark:bg-[#1a2233]">
          <div className="mx-auto max-w-[1280px] px-4 md:px-10">
            <div className="mb-10">
              <h2 className="text-3xl md:text-4xl font-bold leading-tight tracking-tight mb-4">Our Expertise</h2>
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                Explore our services and see sample projects for each specialty
              </p>
            </div>
            <ServiceAlbums 
              services={settings.services} 
              albums={albums} 
            />
          </div>
        </section>
      )}
      
      {featuredAlbums.length > 0 && <AlbumGrid albums={featuredAlbums} />}
    </PublicLayout>
  );
}
