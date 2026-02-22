'use client';

import React from 'react';
import Link from 'next/link';

interface LinkedAlbum {
  _id: string;
  title: string;
  slug: string;
  coverImageUrl?: string;
}

interface Service {
  title: string;
  description: string;
  icon?: string;
  imageUrl?: string;
  albumCount: number;
  linkedAlbums: LinkedAlbum[];
}

interface ServicesTableProps {
  services: Service[];
  onDelete: (title: string) => void;
  onEdit: (service: Service) => void;
  isDeleting: string | null;
}

export function ServicesTable({ services, onDelete, onEdit, isDeleting }: ServicesTableProps) {
  if (services.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-8 text-center">
        <p className="text-gray-500 mb-4">No services found.</p>
        <button
          onClick={() => window.location.reload()}
          className="inline-block px-6 py-3 bg-primary text-white rounded-lg hover:bg-blue-700"
        >
          Create Your First Service
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="text-left px-6 py-3 text-sm font-medium text-gray-700">Service</th>
            <th className="text-left px-6 py-3 text-sm font-medium text-gray-700">Linked Albums</th>
            <th className="text-right px-6 py-3 text-sm font-medium text-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {services.map((service) => (
            <tr key={service.title} className="hover:bg-gray-50">
              <td className="px-6 py-4">
                <div className="flex items-start gap-3">
                  {service.imageUrl ? (
                    <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                      <img
                        src={service.imageUrl}
                        alt={service.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : service.icon ? (
                    <span className="text-3xl w-16 h-16 flex items-center justify-center flex-shrink-0 bg-gray-100 rounded-lg">
                      {service.icon}
                    </span>
                  ) : (
                    <div className="w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl text-gray-400">🎯</span>
                    </div>
                  )}
                  <div>
                    <div className="font-medium text-gray-900">{service.title}</div>
                    <div className="text-sm text-gray-500 mt-1 line-clamp-2 max-w-md">
                      {service.description}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {service.albumCount} {service.albumCount === 1 ? 'album' : 'albums'}
                  </span>
                </div>
                {service.linkedAlbums.length > 0 && (
                  <div className="mt-2 space-y-1">
                    {service.linkedAlbums.slice(0, 3).map((album) => (
                      <Link
                        key={album._id}
                        href={`/admin/gallery/albums/${album._id}/images`}
                        className="block text-sm text-primary hover:text-blue-700 hover:underline"
                      >
                        → {album.title}
                      </Link>
                    ))}
                    {service.linkedAlbums.length > 3 && (
                      <span className="text-sm text-gray-500">
                        +{service.linkedAlbums.length - 3} more
                      </span>
                    )}
                  </div>
                )}
              </td>
              <td className="px-6 py-4 text-right space-x-3">
                <button
                  onClick={() => onEdit(service)}
                  className="text-primary hover:text-blue-700 font-medium"
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    if (confirm(`Are you sure you want to delete "${service.title}"?\n\nThis will also remove this service tag from all linked portfolio albums.`)) {
                      onDelete(service.title);
                    }
                  }}
                  disabled={isDeleting === service.title}
                  className="text-red-600 hover:text-red-800 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isDeleting === service.title ? 'Deleting...' : 'Delete'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
