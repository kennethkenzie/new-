import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '../../../../../lib/mongodb';
import User from '../../../../../models/User';
import File from '../../../../../models/File';
import Booking from '../../../../../models/Booking';
import Message from '../../../../../models/Message';
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

    // Check if user has dashboard access
    if (!decoded.permissions.includes('dashboard_access')) {
      return NextResponse.json(
        { error: 'Insufficient permissions' },
        { status: 403 }
      );
    }

    await connectToDatabase();

    const { searchParams } = new URL(request.url);
    const timeRange = searchParams.get('timeRange') || '7days';

    const now = new Date();
    const timeRanges = {
      '7days': 7,
      '30days': 30,
      '90days': 90
    };
    
    const daysBack = timeRanges[timeRange as keyof typeof timeRanges] || 7;
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - daysBack);

    // Fetch all data
    const [users, files, bookings, messages] = await Promise.all([
      User.find({}),
      File.find({}),
      Booking.find({}),
      Message.find({})
    ]);

    // Calculate user analytics
    const userAnalytics = {
      total: users.length,
      active: users.filter(u => u.isActive).length,
      inactive: users.filter(u => !u.isActive).length,
      newUsers: users.filter(u => new Date(u.createdAt) >= startDate).length,
      recentLogins: users.filter(u => {
        if (!u.lastLogin) return false;
        return new Date(u.lastLogin) >= startDate;
      }).length,
      roleDistribution: users.reduce((acc, user) => {
        acc[user.role] = (acc[user.role] || 0) + 1;
        return acc;
      }, {} as Record<string, number>)
    };

    // Calculate file analytics
    const totalFileSize = files.reduce((sum, file) => sum + file.size, 0);
    const fileAnalytics = {
      total: files.length,
      totalSize: totalFileSize,
      newFiles: files.filter(f => new Date(f.createdAt) >= startDate).length,
      typeDistribution: files.reduce((acc, file) => {
        acc[file.fileType] = (acc[file.fileType] || 0) + 1;
        return acc;
      }, {} as Record<string, number>),
      folderDistribution: files.reduce((acc, file) => {
        acc[file.folder] = (acc[file.folder] || 0) + 1;
        return acc;
      }, {} as Record<string, number>),
      publicFiles: files.filter(f => f.isPublic).length
    };

    // Calculate booking analytics
    const bookingAnalytics = {
      total: bookings.length,
      confirmed: bookings.filter(b => b.status === 'confirmed').length,
      pending: bookings.filter(b => b.status === 'pending').length,
      cancelled: bookings.filter(b => b.status === 'cancelled').length,
      newBookings: bookings.filter(b => new Date(b.createdAt) >= startDate).length,
      totalRevenue: bookings
        .filter(b => b.status === 'confirmed')
        .reduce((sum, booking) => sum + booking.totalPrice, 0)
    };

    // Calculate message analytics
    const messageAnalytics = {
      total: messages.length,
      unread: messages.filter(m => !m.isRead).length,
      read: messages.filter(m => m.isRead).length,
      newMessages: messages.filter(m => new Date(m.createdAt) >= startDate).length,
      typeDistribution: messages.reduce((acc, message) => {
        acc[message.type || 'general'] = (acc[message.type || 'general'] || 0) + 1;
        return acc;
      }, {} as Record<string, number>)
    };

    // Generate daily activity for the past week
    const dailyActivity = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateString = date.toISOString().split('T')[0];
      
      const dayUsers = users.filter(u => {
        const createdDate = new Date(u.createdAt);
        return createdDate.toISOString().split('T')[0] === dateString;
      }).length;
      
      const dayFiles = files.filter(f => {
        const createdDate = new Date(f.createdAt);
        return createdDate.toISOString().split('T')[0] === dateString;
      }).length;
      
      const dayBookings = bookings.filter(b => {
        const createdDate = new Date(b.createdAt);
        return createdDate.toISOString().split('T')[0] === dateString;
      }).length;
      
      const dayMessages = messages.filter(m => {
        const createdDate = new Date(m.createdAt);
        return createdDate.toISOString().split('T')[0] === dateString;
      }).length;
      
      dailyActivity.push({
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        users: dayUsers,
        files: dayFiles,
        bookings: dayBookings,
        messages: dayMessages
      });
    }

    // Calculate growth trends
    const previousStartDate = new Date();
    previousStartDate.setDate(previousStartDate.getDate() - (daysBack * 2));
    previousStartDate.setDate(previousStartDate.getDate() + daysBack);

    const previousUsers = users.filter(u => {
      const createdDate = new Date(u.createdAt);
      return createdDate >= previousStartDate && createdDate < startDate;
    }).length;

    const previousFiles = files.filter(f => {
      const createdDate = new Date(f.createdAt);
      return createdDate >= previousStartDate && createdDate < startDate;
    }).length;

    const trends = {
      userGrowth: previousUsers > 0 ? ((userAnalytics.newUsers - previousUsers) / previousUsers * 100) : 0,
      fileGrowth: previousFiles > 0 ? ((fileAnalytics.newFiles - previousFiles) / previousFiles * 100) : 0,
      activeUserRate: userAnalytics.total > 0 ? (userAnalytics.recentLogins / userAnalytics.total * 100) : 0
    };

    return NextResponse.json({
      users: userAnalytics,
      files: fileAnalytics,
      bookings: bookingAnalytics,
      messages: messageAnalytics,
      dailyActivity,
      trends,
      timeRange,
      generatedAt: new Date().toISOString()
    });

  } catch (error) {
    console.error('Analytics API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}