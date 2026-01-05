import React from 'react';
import Link from 'next/link';

export type PostCard = {
  slug: string;
  title: string;
  excerpt?: string;
  coverImageUrl?: string | null;
  tags?: string[];
  publishedAt?: string;
};

export function PostList({ posts }: { posts: PostCard[] }) {
  return (
    <section className="py-12 md:py-20">
      <div className="mx-auto max-w-[1280px] px-4 md:px-10">
        <div className="mb-10">
          <h2 className="text-3xl md:text-4xl font-bold leading-tight tracking-tight mb-4">Latest Updates</h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            News, updates, and insights from our team.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1a2233] shadow-sm hover:shadow-md transition overflow-hidden"
            >
              <div className="aspect-[16/9] bg-zinc-100 dark:bg-gray-800 overflow-hidden">
                {post.coverImageUrl ? (
                  <div
                    className="h-full w-full bg-cover bg-center group-hover:scale-105 transition-transform duration-300"
                    style={{ backgroundImage: `url("${post.coverImageUrl}")` }}
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center text-gray-400 text-sm bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800">
                    No cover
                  </div>
                )}
              </div>
              <div className="p-4 space-y-2">
                <h3 className="text-base font-semibold leading-snug group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                {post.excerpt && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                    {post.excerpt}
                  </p>
                )}
                <div className="flex flex-wrap gap-2 pt-2">
                  {(post.tags || []).slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-gray-200 dark:border-gray-700 px-2 py-1 text-xs text-gray-700 dark:text-gray-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {posts.length === 0 && (
          <div className="text-center py-16 text-gray-500">
            <p>No posts yet. Check back soon!</p>
          </div>
        )}
      </div>
    </section>
  );
}
