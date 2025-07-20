import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '../../../../../lib/mongodb';
import User from '../../../../../models/User';
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

    // Check if user has user management permission
    if (!decoded.permissions.includes('user_management')) {
      return NextResponse.json(
        { error: 'Insufficient permissions' },
        { status: 403 }
      );
    }

    await connectToDatabase();

    const { action, userIds, data } = await request.json();

    if (!action || !userIds || !Array.isArray(userIds)) {
      return NextResponse.json(
        { error: 'Invalid request parameters' },
        { status: 400 }
      );
    }

    let result;

    switch (action) {
      case 'activate':
        result = await User.updateMany(
          { _id: { $in: userIds } },
          { $set: { isActive: true, updatedAt: new Date() } }
        );
        break;

      case 'deactivate':
        result = await User.updateMany(
          { _id: { $in: userIds } },
          { $set: { isActive: false, updatedAt: new Date() } }
        );
        break;

      case 'delete':
        // Don't allow deleting the current user
        const filteredIds = userIds.filter(id => id !== decoded.userId);
        result = await User.deleteMany({ _id: { $in: filteredIds } });
        break;

      case 'updateRole':
        if (!data?.role) {
          return NextResponse.json(
            { error: 'Role is required for role update' },
            { status: 400 }
          );
        }
        
        const validRoles = ['admin', 'manager', 'staff'];
        if (!validRoles.includes(data.role)) {
          return NextResponse.json(
            { error: 'Invalid role' },
            { status: 400 }
          );
        }

        // Don't allow changing the current user's role
        const roleUpdateIds = userIds.filter(id => id !== decoded.userId);
        result = await User.updateMany(
          { _id: { $in: roleUpdateIds } },
          { $set: { role: data.role, updatedAt: new Date() } }
        );
        break;

      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        );
    }

    return NextResponse.json({
      message: `Bulk ${action} completed successfully`,
      modifiedCount: result.modifiedCount || result.deletedCount,
      result
    });

  } catch (error) {
    console.error('Bulk user operation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}