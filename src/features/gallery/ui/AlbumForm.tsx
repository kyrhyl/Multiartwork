'use client';

import React from 'react';
import { InputField, TextAreaField } from '@/shared/ui/FormFields';
import { ImageUpload } from '@/shared/ui/ImageUpload';

interface AlbumFormData {
  title: string;
  slug: string;
  description: string;
  coverImage: string;
  order: number;
}

interface AlbumFormProps {
  formData: AlbumFormData;
  onChange: (field: keyof AlbumFormData, value: any) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
  error: string | null;
  successMessage: string | null;
  submitLabel: string;
}

export function AlbumForm({
  formData,
  onChange,
  onSubmit,
  isLoading,
  error,
  successMessage,
  submitLabel,
}: AlbumFormProps) {
  const generateSlug = () => {
    const slug = formData.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
    onChange('slug', slug);
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {successMessage && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
          {successMessage}
        </div>
      )}

      <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
        <div className="flex gap-4 items-end">
          <div className="flex-1">
            <InputField
              label="Album Title"
              name="title"
              value={formData.title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange('title', e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          <button
            type="button"
            onClick={generateSlug}
            disabled={isLoading || !formData.title}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed h-[42px]"
          >
            Generate Slug
          </button>
        </div>

        <InputField
          label="Slug"
          name="slug"
          value={formData.slug}
          onChange={(e) => onChange('slug', e.target.value)}
          required
          disabled={isLoading}
          placeholder="my-album"
        />

        <TextAreaField
          label="Description"
          name="description"
          value={formData.description}
          onChange={(e) => onChange('description', e.target.value)}
          rows={3}
          disabled={isLoading}
          placeholder="Album description..."
        />

        <ImageUpload
          label="Cover Image"
          currentImage={formData.coverImage}
          onUpload={(url) => onChange('coverImage', url)}
          disabled={isLoading}
        />

        <InputField
          label="Order"
          name="order"
          type="number"
          value={formData.order.toString()}
          onChange={(e) => onChange('order', parseInt(e.target.value) || 0)}
          disabled={isLoading}
        />
      </div>

      <div className="flex justify-end gap-4">
        <button
          type="submit"
          disabled={isLoading}
          className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
        >
          {isLoading ? 'Saving...' : submitLabel}
        </button>
      </div>
    </form>
  );
}
