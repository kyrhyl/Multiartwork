'use client';

import React from 'react';
import Link from 'next/link';

interface Post {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  status: 'draft' | 'published';
  createdAt: string;
  publishedAt?: string;
}

interface PostsTableProps {
  posts: Post[];
  onDelete: (id: string) => void;
  isDeleting: string | null;
}

export function PostsTable({ posts, onDelete, isDeleting }: PostsTableProps) {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (posts.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-8 text-center">
        <p className="text-gray-500 mb-4">No posts found.</p>
        <Link
          href="/admin/posts/new"
          className="inline-block px-6 py-3 bg-primary text-white rounded-lg hover:bg-blue-700"
        >
          Create Your First Post
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="text-left px-6 py-3 text-sm font-medium text-gray-700">Title</th>
            <th className="text-left px-6 py-3 text-sm font-medium text-gray-700">Status</th>
            <th className="text-left px-6 py-3 text-sm font-medium text-gray-700">Date</th>
            <th className="text-right px-6 py-3 text-sm font-medium text-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {posts.map((post) => (
            <tr key={post._id} className="hover:bg-gray-50">
              <td className="px-6 py-4">
                <div>
                  <div className="font-medium text-gray-900">{post.title}</div>
                  {post.excerpt && (
                    <div className="text-sm text-gray-500 mt-1 truncate max-w-md">
                      {post.excerpt}
                    </div>
                  )}
                </div>
              </td>
              <td className="px-6 py-4">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    post.status === 'published'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {post.status.charAt(0).toUpperCase() + post.status.slice(1)}
                </span>
              </td>
              <td className="px-6 py-4 text-sm text-gray-500">
                {post.status === 'published' && post.publishedAt
                  ? formatDate(post.publishedAt)
                  : formatDate(post.createdAt)}
              </td>
              <td className="px-6 py-4 text-right space-x-3">
                <Link
                  href={`/admin/posts/${post._id}/edit`}
                  className="text-primary hover:text-blue-700 font-medium"
                >
                  Edit
                </Link>
                <button
                  onClick={() => {
                    if (confirm('Are you sure you want to delete this post?')) {
                      onDelete(post._id);
                    }
                  }}
                  disabled={isDeleting === post._id}
                  className="text-red-600 hover:text-red-800 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isDeleting === post._id ? 'Deleting...' : 'Delete'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
