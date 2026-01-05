import { connectDB } from '@/lib/db';
import { PostModel } from '@/lib/models/Post';

export async function getPublishedPostsServer() {
  await connectDB();
  const posts = await PostModel.find({ status: 'published' })
    .sort({ publishedAt: -1 })
    .lean();
  
  return posts.map((p: any) => ({
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt ?? '',
    coverImageUrl: p.coverImageUrl ?? null,
    tags: p.tags || [],
    publishedAt: p.publishedAt ? p.publishedAt.toISOString() : null,
  }));
}
