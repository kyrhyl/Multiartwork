'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AlbumForm } from '../ui/AlbumForm';

interface AlbumFormData {
  title: string;
  slug: string;
  description: string;
  coverImage: string;
  order: number;
}

export function NewAlbumContainer() {
  const router = useRouter();
  const [formData, setFormData] = useState<AlbumFormData>({
    title: '',
    slug: '',
    description: '',
    coverImage: '',
    order: 0,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleChange = (field: keyof AlbumFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);
    setIsLoading(true);

    try {
      const response = await fetch('/api/admin/gallery/albums', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || 'Failed to create album');
      }

      setSuccessMessage('Album created successfully!');

      setTimeout(() => {
        router.push(`/admin/gallery/albums/${data.album._id}/images`);
      }, 1000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Create New Album</h1>
        <p className="text-gray-600 mt-2">Create a new photo gallery album</p>
      </div>

      <AlbumForm
        formData={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
        isLoading={isLoading}
        error={error}
        successMessage={successMessage}
        submitLabel="Create Album"
      />
    </div>
  );
}
