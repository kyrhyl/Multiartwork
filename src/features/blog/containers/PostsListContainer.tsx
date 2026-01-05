'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { PostsTable } from '../ui/PostsTable';

interface Post {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  status: 'draft' | 'published';
  createdAt: string;
  publishedAt?: string;
}

export function PostsListContainer() {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'published' | 'draft'>('all');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPosts();
  }, [filter]);

  const fetchPosts = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const url = `/api/admin/posts?status=${filter}`;
      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || 'Failed to fetch posts');
      }

      setPosts(data.posts);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      setIsDeleting(id);
      const response = await fetch(`/api/admin/posts/${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || 'Failed to delete post');
      }

      // Remove from list
      setPosts((prev) => prev.filter((post) => post._id !== id));
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to delete post');
    } finally {
      setIsDeleting(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Blog Posts</h1>
          <p className="text-gray-600 mt-2">Manage your blog posts and articles</p>
        </div>
        <Link
          href="/admin/posts/new"
          className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-blue-700 font-medium"
        >
          + New Post
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg font-medium ${
              filter === 'all'
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All Posts
          </button>
          <button
            onClick={() => setFilter('published')}
            className={`px-4 py-2 rounded-lg font-medium ${
              filter === 'published'
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Published
          </button>
          <button
            onClick={() => setFilter('draft')}
            className={`px-4 py-2 rounded-lg font-medium ${
              filter === 'draft'
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Drafts
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {/* Loading State */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : (
        <PostsTable posts={posts} onDelete={handleDelete} isDeleting={isDeleting} />
      )}
    </div>
  );
}
