import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { PostModel } from '@/lib/models/Post';
import { z } from 'zod';

const postSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z.string().min(1, 'Slug is required').regex(/^[a-z0-9-]+$/, 'Slug must be lowercase with hyphens only'),
  excerpt: z.string().optional(),
  content: z.string().min(1, 'Content is required'),
  featuredImage: z.string().optional(),
  status: z.enum(['draft', 'published']).default('draft'),
  tags: z.array(z.string()).optional(),
});

interface Params {
  params: Promise<{
    id: string;
  }>;
}

/**
 * GET /api/admin/posts/[id]
 * Fetch a single post by ID
 */
export async function GET(request: NextRequest, { params }: Params) {
  try {
    const resolvedParams = await params;
    await connectDB();

    const post = await PostModel.findById(resolvedParams.id).lean();

    if (!post) {
      return NextResponse.json(
        { success: false, error: { message: 'Post not found' } },
        { status: 404 }
      );
    }

    // Map database fields to API response fields
    const postResponse = {
      ...post,
      _id: post._id.toString(),
      content: post.contentHtml,
      featuredImage: post.coverImageUrl || '',
    };

    return NextResponse.json({ success: true, post: postResponse });
  } catch (error) {
    console.error('Error fetching post:', error);
    return NextResponse.json(
      { success: false, error: { message: 'Failed to fetch post' } },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/admin/posts/[id]
 * Update a post
 */
export async function PUT(request: NextRequest, { params }: Params) {
  try {
    const resolvedParams = await params;
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

    // Check if post exists
    const existingPost = await PostModel.findById(resolvedParams.id);
    if (!existingPost) {
      return NextResponse.json(
        { success: false, error: { message: 'Post not found' } },
        { status: 404 }
      );
    }

    // Check if slug is being changed and if it conflicts
    if (validation.data.slug !== existingPost.slug) {
      const slugConflict = await PostModel.findOne({ slug: validation.data.slug });
      if (slugConflict) {
        return NextResponse.json(
          { success: false, error: { message: 'A post with this slug already exists' } },
          { status: 400 }
        );
      }
    }

    // Map API fields to database fields and update publishedAt if status changes to published
    const updateData: any = {
      title: validation.data.title,
      slug: validation.data.slug,
      excerpt: validation.data.excerpt || '',
      contentHtml: validation.data.content,
      coverImageUrl: validation.data.featuredImage,
      tags: validation.data.tags || [],
      status: validation.data.status,
    };
    
    if (validation.data.status === 'published' && existingPost.status !== 'published') {
      updateData.publishedAt = new Date();
    }

    const post = await PostModel.findByIdAndUpdate(resolvedParams.id, updateData, {
      new: true,
      runValidators: true,
    }).lean();

    // Map database fields to API response fields
    const postResponse = {
      ...post,
      _id: post!._id.toString(),
      content: post!.contentHtml,
      featuredImage: post!.coverImageUrl || '',
    };

    return NextResponse.json({ success: true, post: postResponse });
  } catch (error) {
    console.error('Error updating post:', error);
    return NextResponse.json(
      { success: false, error: { message: 'Failed to update post' } },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/admin/posts/[id]
 * Delete a post
 */
export async function DELETE(request: NextRequest, { params }: Params) {
  try {
    const resolvedParams = await params;
    await connectDB();

    const post = await PostModel.findByIdAndDelete(resolvedParams.id);

    if (!post) {
      return NextResponse.json(
        { success: false, error: { message: 'Post not found' } },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Error deleting post:', error);
    return NextResponse.json(
      { success: false, error: { message: 'Failed to delete post' } },
      { status: 500 }
    );
  }
}
