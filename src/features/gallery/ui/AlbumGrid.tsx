import React from 'react';
import Link from 'next/link';

export type AlbumCard = {
  slug: string;
  title: string;
  description?: string;
  coverImageUrl?: string | null;
};

export function AlbumGrid({ albums }: { albums: AlbumCard[] }) {
  return (
    <section className="py-12 md:py-20">
      <div className="mx-auto max-w-[1280px] px-4 md:px-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
          <div className="max-w-xl">
            <h2 className="text-3xl md:text-4xl font-bold leading-tight tracking-tight mb-4">Our Portfolio</h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Explore our gallery of completed projects showcasing precision engineering and creative design.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {albums.map((album) => (
            <Link
              key={album.slug}
              href={`/gallery/${album.slug}`}
              className="group flex flex-col rounded-xl overflow-hidden bg-white dark:bg-[#1a2233] shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-800"
            >
              <div 
                className="h-64 w-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                style={{
                  backgroundImage: album.coverImageUrl
                    ? `url("${album.coverImageUrl}")`
                    : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                }}
              />
              <div className="p-5">
                <h3 className="text-lg font-bold mb-2">{album.title}</h3>
                {album.description && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                    {album.description}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>

        {albums.length === 0 && (
          <div className="text-center py-16 text-gray-500">
            <p>No albums yet. Check back soon!</p>
          </div>
        )}
      </div>
    </section>
  );
}
