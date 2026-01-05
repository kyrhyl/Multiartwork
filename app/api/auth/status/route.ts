import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';

export async function GET() {
  try {
    await connectDB();
    return NextResponse.json({ 
      connected: true,
      status: 'ok',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json({ 
      connected: false,
      status: 'error',
      message: error instanceof Error ? error.message : 'Connection failed'
    }, { status: 500 });
  }
}
