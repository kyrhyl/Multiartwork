import { PublicLayout } from '@/shared/layout/PublicLayout';
import { PostList } from '@/features/posts/ui/PostList';
import { getPublishedPostsServer } from '@/features/posts/api/server/getPublishedPosts';

export const metadata = {
  title: 'Blog | Multi-Artworks & Signages',
  description: 'News, updates, and insights from our team.',
};

export default async function BlogPage() {
  const posts = await getPublishedPostsServer();

  return (
    <PublicLayout>
      <PostList posts={posts} />
    </PublicLayout>
  );
}
