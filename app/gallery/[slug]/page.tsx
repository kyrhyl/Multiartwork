import { PublicLayout } from '@/shared/layout/PublicLayout';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

async function getAlbum(slug: string) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || process.env.VERCEL_URL 
    ? `https://${process.env.VERCEL_URL}` 
    : 'http://localhost:3000';
  
  try {
    const res = await fetch(`${baseUrl}/api/gallery/albums/${slug}`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      return null;
    }

    const data = await res.json();
    return data.album;
  } catch (error) {
    console.error('Error fetching album:', error);
    return null;
  }
}

export async function generateMetadata({ params }: PageProps) {
  const resolvedParams = await params;
  const album = await getAlbum(resolvedParams.slug);

  if (!album) {
    return {
      title: 'Album Not Found | Multi-Artworks & Signages',
    };
  }

  return {
    title: `${album.title} | Gallery | Multi-Artworks & Signages`,
    description: album.description || `View ${album.title} project gallery`,
  };
}

export default async function AlbumPage({ params }: PageProps) {
  const resolvedParams = await params;
  const album = await getAlbum(resolvedParams.slug);

  if (!album) {
    notFound();
  }

  return (
    <PublicLayout>
      <div className="py-12 md:py-20">
        <div className="mx-auto max-w-[1280px] px-4 md:px-10">
          {/* Back button */}
          <Link
            href="/gallery"
            className="inline-flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-8 transition-colors"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Gallery
          </Link>

          {/* Album header */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{album.title}</h1>
            {album.description && (
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl">
                {album.description}
              </p>
            )}
          </div>

          {/* Images grid */}
          {album.images && album.images.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {album.images.map((image: any) => (
                <div
                  key={image._id}
                  className="group relative aspect-square overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800"
                >
                  <Image
                    src={image.imageUrl}
                    alt={image.altText || image.caption || album.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  {image.caption && (
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <p className="text-white text-sm font-medium">
                          {image.caption}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-gray-500">
              <p>No images in this album yet.</p>
            </div>
          )}
        </div>
      </div>
    </PublicLayout>
  );
}
