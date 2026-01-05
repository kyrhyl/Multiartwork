'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { AlbumsGrid } from '../ui/AlbumsGrid';

interface Album {
  _id: string;
  title: string;
  slug: string;
  description?: string;
  coverImage?: string;
  order: number;
}

export function AlbumsListContainer() {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAlbums();
  }, []);

  const fetchAlbums = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch('/api/admin/gallery/albums');
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || 'Failed to fetch albums');
      }

      setAlbums(data.albums);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      setIsDeleting(id);
      const response = await fetch(`/api/admin/gallery/albums/${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || 'Failed to delete album');
      }

      setAlbums((prev) => prev.filter((album) => album._id !== id));
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to delete album');
    } finally {
      setIsDeleting(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gallery Albums</h1>
          <p className="text-gray-600 mt-2">Manage your photo gallery albums</p>
        </div>
        <Link
          href="/admin/gallery/albums/new"
          className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-blue-700 font-medium"
        >
          + New Album
        </Link>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : (
        <AlbumsGrid albums={albums} onDelete={handleDelete} isDeleting={isDeleting} />
      )}
    </div>
  );
}
