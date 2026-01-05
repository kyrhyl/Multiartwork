import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { PostModel } from '@/lib/models/Post';

interface Params {
  params: Promise<{
    slug: string;
  }>;
}

/**
 * GET /api/posts/[slug]
 * Public endpoint to fetch a single published post by slug
 */
export async function GET(request: NextRequest, { params }: Params) {
  try {
    const resolvedParams = await params;
    await connectDB();

    const post = await PostModel.findOne({
      slug: resolvedParams.slug,
      status: 'published',
    }).lean();

    if (!post) {
      return NextResponse.json(
        { success: false, error: { message: 'Post not found' } },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, post });
  } catch (error) {
    console.error('Error fetching post:', error);
    return NextResponse.json(
      { success: false, error: { message: 'Failed to fetch post' } },
      { status: 500 }
    );
  }
}
