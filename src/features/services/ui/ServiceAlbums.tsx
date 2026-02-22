'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Album {
  _id: string;
  slug: string;
  title: string;
  description?: string;
  coverImageUrl?: string;
  sortOrder: number;
  serviceTags: string[];
  createdAt?: Date;
}

interface Service {
  title: string;
  description: string;
  icon?: string;
  imageUrl?: string;
}

interface ServiceAlbumsProps {
  services: Service[];
  albums: Album[];
}

export function ServiceAlbums({ services, albums }: ServiceAlbumsProps) {
  const getAlbumsForService = (serviceTitle: string) => {
    const serviceAlbums = albums.filter(album => 
      album.serviceTags && album.serviceTags.includes(serviceTitle)
    );
    
    // Sort by newest first (createdAt descending, or sortOrder descending as fallback)
    return serviceAlbums.sort((a, b) => {
      // If createdAt exists, use it (newest first)
      if (a.createdAt && b.createdAt) {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      // Fallback to sortOrder (higher number = newer/show first)
      return (b.sortOrder || 0) - (a.sortOrder || 0);
    });
  };

  const getFeaturedAlbum = (serviceTitle: string) => {
    const serviceAlbums = getAlbumsForService(serviceTitle);
    return serviceAlbums.length > 0 ? serviceAlbums[0] : null;
  };

  return (
    <div className="space-y-12">
      {services.map((service, index) => {
        const serviceAlbums = getAlbumsForService(service.title);
        const featuredAlbum = getFeaturedAlbum(service.title);
        const hasAlbums = serviceAlbums.length > 0;

        return (
          <div 
            key={index} 
            className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
          >
            {/* Full Width Service Header */}
            <div className="p-8 md:p-12">
              <div className="flex flex-col lg:flex-row gap-8 items-start">
                {/* Large Service Image */}
                <div className="flex-shrink-0 mx-auto lg:mx-0">
                  {service.imageUrl ? (
                    <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-2xl overflow-hidden shadow-xl">
                      <Image
                        src={service.imageUrl}
                        alt={service.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : featuredAlbum?.coverImageUrl ? (
                    <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-2xl overflow-hidden shadow-xl">
                      <Image
                        src={featuredAlbum.coverImageUrl}
                        alt={featuredAlbum.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : service.icon ? (
                    <div className="w-64 h-64 md:w-80 md:h-80 rounded-2xl bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center shadow-xl">
                      <span className="text-8xl md:text-9xl">{service.icon}</span>
                    </div>
                  ) : (
                    <div className="w-64 h-64 md:w-80 md:h-80 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center shadow-xl">
                      <span className="text-8xl md:text-9xl text-gray-400">🎯</span>
                    </div>
                  )}
                </div>
                
                {/* Service Info */}
                <div className="flex-1 text-center lg:text-left">
                  <div className="flex items-center justify-center lg:justify-start gap-3 mb-4">
                    {service.icon && !service.imageUrl && (
                      <span className="text-3xl">{service.icon}</span>
                    )}
                    <h3 className="text-3xl md:text-4xl font-bold text-gray-900">
                      {service.title}
                    </h3>
                  </div>
                  
                  {/* Full Description */}
                  <p className="text-gray-600 text-lg md:text-xl leading-relaxed mb-6 max-w-3xl">
                    {service.description}
                  </p>
                  
                  {hasAlbums && (
                    <p className="text-primary text-lg font-medium">
                      {serviceAlbums.length} {serviceAlbums.length === 1 ? 'Sample Project' : 'Sample Projects'}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Full Width Portfolio Section - Shows ALL Albums */}
            {hasAlbums ? (
              <div className="border-t border-gray-100 bg-gray-50/50 p-8 md:p-12">
                <h4 className="text-xl font-semibold text-gray-900 mb-6">
                  Portfolio ({serviceAlbums.length} {serviceAlbums.length === 1 ? 'Project' : 'Projects'})
                </h4>
                
                {/* Grid showing ALL portfolio albums */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                  {serviceAlbums.map((album) => (
                    <Link
                      key={album._id}
                      href={`/gallery/${album.slug}`}
                      className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100"
                    >
                      {/* Album Cover */}
                      <div className="relative aspect-[4/3] overflow-hidden">
                        {album.coverImageUrl ? (
                          <Image
                            src={album.coverImageUrl}
                            alt={album.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                            <span className="text-gray-400 text-4xl">🖼️</span>
                          </div>
                        )}
                      </div>
                      
                      {/* Album Info */}
                      <div className="p-4">
                        <h5 className="font-semibold text-gray-900 text-base line-clamp-1 group-hover:text-primary transition-colors mb-1">
                          {album.title}
                        </h5>
                        {album.description && (
                          <p className="text-gray-500 text-sm line-clamp-2">
                            {album.description}
                          </p>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <div className="border-t border-gray-100 p-8 md:p-12 bg-gray-50/50">
                <p className="text-lg text-gray-400 italic text-center">
                  No portfolio projects yet for this service
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
