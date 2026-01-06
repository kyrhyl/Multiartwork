'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface ImageUploadProps {
  label: string;
  currentImage?: string;
  onUpload: (imageUrl: string) => void;
  disabled?: boolean;
}

export function ImageUpload({ label, currentImage, onUpload, disabled = false }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image size must be less than 5MB');
      return;
    }

    setError(null);
    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);

      console.log('Uploading image:', file.name, 'Size:', file.size);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        console.error('Upload failed:', data);
        throw new Error(data.error?.message || 'Upload failed');
      }

      console.log('Upload successful:', data.url);
      onUpload(data.url);
    } catch (err) {
      console.error('Upload error:', err);
      setError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">{label}</label>

      {currentImage && (
        <div className="relative w-full h-48 bg-gray-100 rounded-lg overflow-hidden">
          <Image
            src={currentImage}
            alt="Preview"
            fill
            className="object-cover"
          />
        </div>
      )}

      <div className="flex items-center space-x-4">
        <label className="cursor-pointer">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            disabled={disabled || isUploading}
            className="hidden"
          />
          <span className="inline-block px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed">
            {isUploading ? 'Uploading...' : 'Choose Image'}
          </span>
        </label>

        {currentImage && (
          <button
            type="button"
            onClick={() => onUpload('')}
            disabled={disabled || isUploading}
            className="text-sm text-red-600 hover:text-red-800"
          >
            Remove
          </button>
        )}
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <p className="text-xs text-gray-500">Max size: 5MB. Formats: JPG, PNG, WebP</p>
    </div>
  );
}
