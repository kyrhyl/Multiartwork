import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { PostModel } from '@/lib/models/Post';

/**
 * GET /api/posts
 * Public endpoint to fetch published posts
 */
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;

    const posts = await PostModel.find({ status: 'published' })
      .sort({ publishedAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const total = await PostModel.countDocuments({ status: 'published' });

    return NextResponse.json({
      success: true,
      posts,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json(
      { success: false, error: { message: 'Failed to fetch posts' } },
      { status: 500 }
    );
  }
}
