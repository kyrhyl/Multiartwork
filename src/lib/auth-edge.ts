import { jwtVerify } from 'jose';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

export interface JWTPayload {
  userId: string;
  email: string;
  role: string;
}

/**
 * Verify a JWT token in Edge Runtime (middleware)
 */
export async function verifyTokenEdge(token: string): Promise<JWTPayload | null> {
  try {
    const secret = new TextEncoder().encode(JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    
    return {
      userId: payload.userId as string,
      email: payload.email as string,
      role: payload.role as string,
    };
  } catch (error) {
    console.error('❌ Edge token verification failed:', error instanceof Error ? error.message : error);
    return null;
  }
}
