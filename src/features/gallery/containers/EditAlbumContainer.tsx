'use client';

import React, { useState, useEffect } from 'react';
import { AlbumForm } from '../ui/AlbumForm';

interface AlbumFormData {
  title: string;
  slug: string;
  description: string;
  coverImage: string;
  order: number;
  serviceTags: string[];
}

interface EditAlbumContainerProps {
  albumId: string;
}

export function EditAlbumContainer({ albumId }: EditAlbumContainerProps) {
  const [formData, setFormData] = useState<AlbumFormData>({
    title: '',
    slug: '',
    description: '',
    coverImage: '',
    order: 0,
    serviceTags: [],
  });

  const [availableServices, setAvailableServices] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    fetchAlbum();
    fetchServices();
  }, [albumId]);

  const fetchServices = async () => {
    try {
      const response = await fetch('/api/settings');
      const data = await response.json();
      if (data.success && data.settings?.services) {
        setAvailableServices(data.settings.services.map((s: any) => s.title));
      }
    } catch (err) {
      console.error('Failed to fetch services:', err);
    }
  };

  const fetchAlbum = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/admin/gallery/albums/${albumId}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || 'Failed to fetch portfolio album');
      }

      setFormData({
        title: data.album.title,
        slug: data.album.slug,
        description: data.album.description || '',
        coverImage: data.album.coverImage || '',
        order: data.album.order || 0,
        serviceTags: data.album.serviceTags || [],
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load portfolio album');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (field: keyof AlbumFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);
    setIsSaving(true);

    try {
      const response = await fetch(`/api/admin/gallery/albums/${albumId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || 'Failed to update portfolio album');
      }

      setSuccessMessage('Portfolio album updated successfully!');
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error && !formData.title) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Edit Portfolio Album</h1>
        <p className="text-gray-600 mt-2">Update portfolio album details</p>
      </div>

      <AlbumForm
        formData={formData}
        availableServices={availableServices}
        onChange={handleChange}
        onSubmit={handleSubmit}
        isLoading={isSaving}
        error={error}
        successMessage={successMessage}
        submitLabel="Update Portfolio Album"
      />
    </div>
  );
}
