'use client';

import React from 'react';
import Link from 'next/link';

interface Album {
  _id: string;
  title: string;
  slug: string;
  description?: string;
  coverImage?: string;
  order: number;
}

interface AlbumsGridProps {
  albums: Album[];
  onDelete: (id: string) => void;
  isDeleting: string | null;
}

export function AlbumsGrid({ albums, onDelete, isDeleting }: AlbumsGridProps) {
  if (albums.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-8 text-center">
        <p className="text-gray-500 mb-4">No albums found.</p>
        <Link
          href="/admin/gallery/albums/new"
          className="inline-block px-6 py-3 bg-primary text-white rounded-lg hover:bg-blue-700"
        >
          Create Your First Album
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {albums.map((album) => (
        <div key={album._id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
          {/* Cover Image */}
          <div className="aspect-video bg-gray-100 relative">
            {album.coverImage ? (
              <img
                src={album.coverImage}
                alt={album.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400">
                No cover image
              </div>
            )}
          </div>

          {/* Album Info */}
          <div className="p-4">
            <h3 className="font-semibold text-lg text-gray-900 mb-1">{album.title}</h3>
            {album.description && (
              <p className="text-sm text-gray-500 mb-3 line-clamp-2">{album.description}</p>
            )}

            {/* Actions */}
            <div className="flex gap-2 pt-3 border-t border-gray-100">
              <Link
                href={`/admin/gallery/albums/${album._id}/edit`}
                className="flex-1 text-center px-3 py-2 text-sm bg-primary text-white rounded hover:bg-blue-700"
              >
                Edit
              </Link>
              <Link
                href={`/admin/gallery/albums/${album._id}/images`}
                className="flex-1 text-center px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
              >
                Manage Images
              </Link>
              <button
                onClick={() => {
                  if (confirm(`Delete "${album.title}"? This will also delete all images in this album.`)) {
                    onDelete(album._id);
                  }
                }}
                disabled={isDeleting === album._id}
                className="px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded disabled:opacity-50"
              >
                {isDeleting === album._id ? '...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
