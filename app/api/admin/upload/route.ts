import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';
import sharp from 'sharp';
import connectDB from '../../../../lib/mongodb.js';
import File from '../../../../models/File.js';
import User from '../../../../models/User.js';
import { verify } from 'jsonwebtoken';

// Create uploads directory if it doesn't exist
async function ensureUploadsDir() {
  const uploadsDir = join(process.cwd(), 'public', 'uploads');
  try {
    await mkdir(uploadsDir, { recursive: true });
  } catch (error) {
    // Directory already exists
  }
  return uploadsDir;
}

// Verify JWT token
async function verifyToken(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = verify(token, process.env.JWT_SECRET || 'your-secret-key') as any;
    return decoded;
  } catch (error) {
    return null;
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    // Verify authentication
    const tokenData = await verifyToken(request);
    if (!tokenData) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get user from database
    const user = await User.findById(tokenData.userId);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;
    const category = formData.get('category') as string || 'other';
    const description = formData.get('description') as string || '';
    const alt = formData.get('alt') as string || '';

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: 'Invalid file type. Only JPEG, PNG, JPG, and WebP are allowed' }, { status: 400 });
    }

    // Validate file size (5MB limit)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return NextResponse.json({ error: 'File too large. Maximum size is 5MB' }, { status: 400 });
    }

    // Generate unique filename
    const fileExtension = file.name.split('.').pop();
    const filename = `${uuidv4()}.${fileExtension}`;
    
    // Ensure uploads directory exists
    const uploadsDir = await ensureUploadsDir();
    const filepath = join(uploadsDir, filename);

    // Read file buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Process image with sharp (resize and optimize)
    let processedBuffer = buffer;
    let width, height;

    if (file.type.startsWith('image/')) {
      const sharpImage = sharp(buffer);
      const metadata = await sharpImage.metadata();
      width = metadata.width;
      height = metadata.height;

      // Resize if too large (maintain aspect ratio)
      if (width && height && (width > 1920 || height > 1080)) {
        processedBuffer = await sharpImage
          .resize(1920, 1080, {
            fit: 'inside',
            withoutEnlargement: true
          })
          .jpeg({ quality: 85 })
          .toBuffer();
      }
    }

    // Save file to disk
    await writeFile(filepath, processedBuffer);

    // Create file record in database
    const fileRecord = await File.create({
      filename,
      originalName: file.name,
      mimetype: file.type,
      size: processedBuffer.length,
      path: filepath,
      url: `/uploads/${filename}`,
      category,
      uploadedBy: user._id,
      isActive: true,
      metadata: {
        width,
        height,
        description,
        alt
      }
    });

    console.log('File uploaded successfully:', filename);

    return NextResponse.json({
      success: true,
      file: {
        id: fileRecord._id,
        filename: fileRecord.filename,
        originalName: fileRecord.originalName,
        url: fileRecord.url,
        mimetype: fileRecord.mimetype,
        size: fileRecord.size,
        category: fileRecord.category,
        metadata: fileRecord.metadata,
        createdAt: fileRecord.createdAt
      }
    });

  } catch (error) {
    console.error('File upload error:', error);
    return NextResponse.json({ error: 'File upload failed' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    // Verify authentication
    const tokenData = await verifyToken(request);
    if (!tokenData) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const skip = (page - 1) * limit;

    // Build query
    const query: any = { isActive: true };
    if (category && category !== 'all') {
      query.category = category;
    }

    // Get files with pagination
    const files = await File.find(query)
      .populate('uploadedBy', 'name username')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const totalFiles = await File.countDocuments(query);

    return NextResponse.json({
      success: true,
      files,
      pagination: {
        page,
        limit,
        total: totalFiles,
        totalPages: Math.ceil(totalFiles / limit)
      }
    });

  } catch (error) {
    console.error('File list error:', error);
    return NextResponse.json({ error: 'Failed to fetch files' }, { status: 500 });
  }
}