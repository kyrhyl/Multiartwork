import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { UserModel } from '@/lib/models/User';
import { verifyPassword, generateToken } from '@/lib/auth';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate input
    const validation = loginSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: { message: validation.error.issues[0].message, code: 'VALIDATION_ERROR' } },
        { status: 400 }
      );
    }

    const { email, password } = validation.data;

    // Connect to database
    await connectDB();

    // Find user
    const user = await UserModel.findOne({ email: email.toLowerCase() });
    if (!user) {
      return NextResponse.json(
        { error: { message: 'Invalid email or password', code: 'INVALID_CREDENTIALS' } },
        { status: 401 }
      );
    }

    // Verify password
    const isValid = await verifyPassword(password, user.passwordHash);
    if (!isValid) {
      return NextResponse.json(
        { error: { message: 'Invalid email or password', code: 'INVALID_CREDENTIALS' } },
        { status: 401 }
      );
    }

    // Generate JWT token
    const token = generateToken({
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
    });

    // Create response with httpOnly cookie
    const response = NextResponse.json({
      success: true,
      user: {
        id: user._id.toString(),
        email: user.email,
        role: user.role,
      },
    });

    // Set httpOnly cookie (secure in production)
    response.cookies.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: { message: 'An error occurred during login', code: 'SERVER_ERROR' } },
      { status: 500 }
    );
  }
}
