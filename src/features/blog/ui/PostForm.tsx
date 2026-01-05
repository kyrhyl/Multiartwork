'use client';

import React from 'react';
import { InputField, TextAreaField } from '@/shared/ui/FormFields';
import { ImageUpload } from '@/shared/ui/ImageUpload';
import { RichTextEditor } from '@/shared/ui/RichTextEditor';

interface PostFormData {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  status: 'draft' | 'published';
  tags: string[];
}

interface PostFormProps {
  formData: PostFormData;
  onChange: (field: keyof PostFormData, value: any) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
  error: string | null;
  successMessage: string | null;
  submitLabel: string;
}

export function PostForm({
  formData,
  onChange,
  onSubmit,
  isLoading,
  error,
  successMessage,
  submitLabel,
}: PostFormProps) {
  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tags = e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag);
    onChange('tags', tags);
  };

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
              label="Title"
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
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange('slug', e.target.value)}
          required
          disabled={isLoading}
          placeholder="my-blog-post"
        />

        <TextAreaField
          label="Excerpt"
          name="excerpt"
          value={formData.excerpt}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => onChange('excerpt', e.target.value)}
          rows={3}
          disabled={isLoading}
          placeholder="Short summary of the post..."
        />

        <ImageUpload
          label="Featured Image"
          currentImage={formData.featuredImage}
          onUpload={(url: string) => onChange('featuredImage', url)}
          disabled={isLoading}
        />

        <InputField
          label="Tags (comma-separated)"
          name="tags"
          value={formData.tags.join(', ')}
          onChange={handleTagsChange}
          disabled={isLoading}
          placeholder="design, web development, tutorial"
        />
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
        <label className="block text-sm font-medium text-gray-700">
          Content <span className="text-red-500">*</span>
        </label>
        <RichTextEditor
          content={formData.content}
          onChange={(content: string) => onChange('content', content)}
          disabled={isLoading}
        />
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
        <label className="block text-sm font-medium text-gray-700">Status</label>
        <div className="flex gap-4">
          <label className="flex items-center">
            <input
              type="radio"
              name="status"
              value="draft"
              checked={formData.status === 'draft'}
              onChange={(e) => onChange('status', e.target.value as 'draft' | 'published')}
              disabled={isLoading}
              className="mr-2"
            />
            <span className="text-gray-700">Draft</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="status"
              value="published"
              checked={formData.status === 'published'}
              onChange={(e) => onChange('status', e.target.value as 'draft' | 'published')}
              disabled={isLoading}
              className="mr-2"
            />
            <span className="text-gray-700">Published</span>
          </label>
        </div>
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
