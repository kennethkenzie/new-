import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '../../../../../lib/mongodb';
import File from '../../../../../models/File';
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

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectToDatabase();

    const file = await File.findOne({ id: params.id });
    if (!file) {
      return NextResponse.json(
        { error: 'File not found' },
        { status: 404 }
      );
    }

    // If file is not public, check authentication
    if (!file.isPublic) {
      const authHeader = request.headers.get('Authorization');
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return NextResponse.json(
          { error: 'Authorization required' },
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
    }

    // Return file data
    return NextResponse.json({
      id: file.id,
      filename: file.filename,
      originalName: file.originalName,
      fileType: file.fileType,
      mimeType: file.mimeType,
      size: file.size,
      formattedSize: file.getFormattedSize(),
      data: file.data,
      uploadedBy: file.uploadedBy,
      uploadedByName: file.uploadedByName,
      description: file.description,
      tags: file.tags,
      isPublic: file.isPublic,
      folder: file.folder,
      createdAt: file.createdAt,
      updatedAt: file.updatedAt
    });

  } catch (error) {
    console.error('File fetch error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
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

    const file = await File.findOne({ id: params.id });
    if (!file) {
      return NextResponse.json(
        { error: 'File not found' },
        { status: 404 }
      );
    }

    // Delete the file
    await File.deleteOne({ id: params.id });

    return NextResponse.json({
      message: 'File deleted successfully'
    });

  } catch (error) {
    console.error('File deletion error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}