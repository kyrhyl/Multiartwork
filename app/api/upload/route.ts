import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Increase timeout for upload route
export const maxDuration = 30; // 30 seconds

/**
 * POST /api/upload
 * Upload an image to Cloudinary
 */
export async function POST(request: NextRequest) {
  try {
    // Validate Cloudinary configuration
    if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
      console.error('Cloudinary credentials not configured');
      return NextResponse.json(
        { success: false, error: { message: 'Cloudinary not configured. Please check environment variables.' } },
        { status: 500 }
      );
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { success: false, error: { message: 'No file provided' } },
        { status: 400 }
      );
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { success: false, error: { message: 'File size must be less than 10MB' } },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    console.log('Uploading to Cloudinary:', {
      fileName: file.name,
      fileSize: file.size,
      cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    });

    // Upload to Cloudinary with timeout
    const result = await Promise.race([
      new Promise<any>((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: 'multiartwork',
            resource_type: 'image',
            timeout: 25000, // 25 second timeout for Cloudinary
          },
          (error, result) => {
            if (error) {
              console.error('Cloudinary upload error:', error);
              reject(error);
            } else {
              console.log('Cloudinary upload success:', result?.secure_url);
              resolve(result);
            }
          }
        );

        uploadStream.end(buffer);
      }),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Upload timeout after 25 seconds')), 25000)
      ),
    ]);

    return NextResponse.json({
      success: true,
      url: result.secure_url,
      publicId: result.public_id,
    });
  } catch (error: any) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: { 
          message: error?.message || 'Upload failed',
          details: error?.http_code ? `HTTP ${error.http_code}` : undefined,
        } 
      },
      { status: 500 }
    );
  }
}
