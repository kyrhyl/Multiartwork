'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PostForm } from '../ui/PostForm';

interface PostFormData {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  status: 'draft' | 'published';
  tags: string[];
}

export function NewPostContainer() {
  const router = useRouter();
  const [formData, setFormData] = useState<PostFormData>({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    featuredImage: '',
    status: 'draft',
    tags: [],
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleChange = (field: keyof PostFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);
    setIsLoading(true);

    try {
      const response = await fetch('/api/admin/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || 'Failed to create post');
      }

      setSuccessMessage('Post created successfully!');
      
      // Redirect to edit page after short delay
      setTimeout(() => {
        router.push(`/admin/posts/${data.post._id}/edit`);
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
        <h1 className="text-3xl font-bold text-gray-900">Create New Post</h1>
        <p className="text-gray-600 mt-2">Write and publish a new blog post</p>
      </div>

      <PostForm
        formData={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
        isLoading={isLoading}
        error={error}
        successMessage={successMessage}
        submitLabel="Create Post"
      />
    </div>
  );
}
