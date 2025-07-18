import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '../../../../lib/mongodb';
import File from '../../../../models/File';
import User from '../../../../models/User';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-here';

// Helper function to verify JWT token
function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET) as any;
  } catch (error) {
    return null;
  }
}

// Helper function to validate file type
function validateFileType(mimeType: string, fileType: string): boolean {
  const allowedTypes = {
    image: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'],
    document: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'text/plain']
  };

  return allowedTypes[fileType as keyof typeof allowedTypes]?.includes(mimeType) || false;
}

export async function POST(request: NextRequest) {
  try {
    // Get token from Authorization header
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Authorization token required' },
        { status: 401 }
      );
    }

    const token = authHeader.split(' ')[1];
    const decoded = verifyToken(token);
    
    if (!decoded) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
    }

    // Check if user has file management permission
    if (!decoded.permissions.includes('file_management')) {
      return NextResponse.json(
        { error: 'Insufficient permissions' },
        { status: 403 }
      );
    }

    await connectToDatabase();

    // Get user details
    const user = await User.findOne({ id: decoded.userId });
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;
    const description = formData.get('description') as string;
    const folder = formData.get('folder') as string || 'general';
    const isPublic = formData.get('isPublic') === 'true';
    const tagsString = formData.get('tags') as string;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Validate file size (10MB limit)
    const MAX_SIZE = 10 * 1024 * 1024; // 10MB
    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: 'File size too large. Maximum 10MB allowed.' },
        { status: 400 }
      );
    }

    // Determine file type
    const mimeType = file.type;
    let fileType: string;
    
    if (mimeType.startsWith('image/')) {
      fileType = 'image';
    } else if (mimeType.startsWith('application/') || mimeType.startsWith('text/')) {
      fileType = 'document';
    } else {
      return NextResponse.json(
        { error: 'Unsupported file type' },
        { status: 400 }
      );
    }

    // Validate file type
    if (!validateFileType(mimeType, fileType)) {
      return NextResponse.json(
        { error: 'Invalid file type for the selected category' },
        { status: 400 }
      );
    }

    // Convert file to base64
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64Data = buffer.toString('base64');

    // Generate unique filename
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 15);
    const extension = file.name.split('.').pop();
    const filename = `${timestamp}_${randomString}.${extension}`;

    // Parse tags
    const tags = tagsString ? tagsString.split(',').map(tag => tag.trim()) : [];

    // Create file record
    const newFile = new File({
      filename,
      originalName: file.name,
      fileType,
      mimeType,
      size: file.size,
      data: base64Data,
      uploadedBy: user.id,
      uploadedByName: `${user.firstName} ${user.lastName}`,
      description,
      tags,
      isPublic,
      folder
    });

    await newFile.save();

    // Return success response without the actual file data
    return NextResponse.json({
      message: 'File uploaded successfully',
      file: {
        id: newFile.id,
        filename: newFile.filename,
        originalName: newFile.originalName,
        fileType: newFile.fileType,
        mimeType: newFile.mimeType,
        size: newFile.size,
        formattedSize: newFile.getFormattedSize(),
        uploadedBy: newFile.uploadedBy,
        uploadedByName: newFile.uploadedByName,
        description: newFile.description,
        tags: newFile.tags,
        isPublic: newFile.isPublic,
        folder: newFile.folder,
        createdAt: newFile.createdAt,
        updatedAt: newFile.updatedAt
      }
    });

  } catch (error) {
    console.error('File upload error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    // Get token from Authorization header
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Authorization token required' },
        { status: 401 }
      );
    }

    const token = authHeader.split(' ')[1];
    const decoded = verifyToken(token);
    
    if (!decoded) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
    }

    await connectToDatabase();

    // Get query parameters
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const fileType = searchParams.get('fileType');
    const folder = searchParams.get('folder');
    const search = searchParams.get('search');

    // Build query
    const query: any = {};
    
    if (fileType) {
      query.fileType = fileType;
    }
    
    if (folder) {
      query.folder = folder;
    }
    
    if (search) {
      query.$or = [
        { originalName: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    const skip = (page - 1) * limit;
    
    // Get files (without data field to save bandwidth)
    const files = await File.find(query)
      .select('-data')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await File.countDocuments(query);

    return NextResponse.json({
      files: files.map(file => ({
        id: file.id,
        filename: file.filename,
        originalName: file.originalName,
        fileType: file.fileType,
        mimeType: file.mimeType,
        size: file.size,
        formattedSize: file.getFormattedSize(),
        uploadedBy: file.uploadedBy,
        uploadedByName: file.uploadedByName,
        description: file.description,
        tags: file.tags,
        isPublic: file.isPublic,
        folder: file.folder,
        createdAt: file.createdAt,
        updatedAt: file.updatedAt
      })),
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalFiles: total,
        limit
      }
    });

  } catch (error) {
    console.error('File list error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}