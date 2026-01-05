import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { PostModel } from '@/lib/models/Post';
import { z } from 'zod';

// Validation schema for post
const postSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z.string().min(1, 'Slug is required').regex(/^[a-z0-9-]+$/, 'Slug must be lowercase with hyphens only'),
  excerpt: z.string().optional(),
  content: z.string().min(1, 'Content is required'),
  featuredImage: z.string().optional(),
  status: z.enum(['draft', 'published']).default('draft'),
  tags: z.array(z.string()).optional(),
});

/**
 * GET /api/admin/posts
 * Fetch all posts (including drafts) for admin
 */
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const status = searchParams.get('status'); // 'all', 'published', 'draft'
    const skip = (page - 1) * limit;

    const filter = status && status !== 'all' ? { status } : {};

    const posts = await PostModel.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const total = await PostModel.countDocuments(filter);

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

/**
 * POST /api/admin/posts
 * Create a new post
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const validation = postSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { success: false, error: { message: 'Invalid input', issues: validation.error.issues } },
        { status: 400 }
      );
    }

    await connectDB();

    // Check if slug already exists
    const existingPost = await PostModel.findOne({ slug: validation.data.slug });
    if (existingPost) {
      return NextResponse.json(
        { success: false, error: { message: 'A post with this slug already exists' } },
        { status: 400 }
      );
    }

    // Create post
    const postData = {
      ...validation.data,
      publishedAt: validation.data.status === 'published' ? new Date() : undefined,
    };

    const post = await PostModel.create(postData);

    return NextResponse.json({ success: true, post }, { status: 201 });
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json(
      { success: false, error: { message: 'Failed to create post' } },
      { status: 500 }
    );
  }
}
