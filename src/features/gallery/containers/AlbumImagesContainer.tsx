'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ImageManager } from '../ui/ImageManager';

interface GalleryImage {
  _id: string;
  imageUrl: string;
  title?: string;
  description?: string;
  order: number;
}

interface Album {
  _id: string;
  title: string;
  slug: string;
  images?: GalleryImage[];
}

interface AlbumImagesContainerProps {
  albumId: string;
}

export function AlbumImagesContainer({ albumId }: AlbumImagesContainerProps) {
  const [album, setAlbum] = useState<Album | null>(null);
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAlbumAndImages();
  }, [albumId]);

  const fetchAlbumAndImages = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch(`/api/admin/gallery/albums/${albumId}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || 'Failed to fetch album');
      }

      setAlbum(data.album);
      setImages(data.album.images || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !album) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
        {error || 'Album not found'}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <div className="flex items-center gap-3">
            <Link href="/admin/gallery" className="text-primary hover:text-blue-700">
              ← Albums
            </Link>
            <span className="text-gray-400">/</span>
            <h1 className="text-3xl font-bold text-gray-900">{album.title}</h1>
          </div>
          <p className="text-gray-600 mt-2">Manage images in this album</p>
        </div>
        <Link
          href={`/admin/gallery/albums/${albumId}/edit`}
          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
        >
          Edit Album Details
        </Link>
      </div>

      <ImageManager albumId={albumId} images={images} onRefresh={fetchAlbumAndImages} />
    </div>
  );
}
