import { NextRequest, NextResponse } from 'next/server';
import connectDB from '../../../../lib/mongodb';
import User from '../../../../models/User';
import Booking from '../../../../models/Booking';
import Room from '../../../../models/Room';
import Message from '../../../../models/Message';
import { verify } from 'jsonwebtoken';

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

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    // Verify authentication
    const tokenData = await verifyToken(request);
    if (!tokenData) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get current date for filtering
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const todayEnd = new Date(todayStart.getTime() + 24 * 60 * 60 * 1000);

    // Get statistics
    const totalBookings = await Booking.countDocuments();
    const todayBookings = await Booking.countDocuments({
      createdAt: { $gte: todayStart, $lt: todayEnd }
    });

    const revenueData = await Booking.aggregate([
      { $match: { status: { $in: ['confirmed', 'checked-in', 'checked-out'] } } },
      { $group: { _id: null, total: { $sum: '$totalAmount' } } }
    ]);
    const totalRevenue = revenueData[0]?.total || 0;

    const totalRooms = await Room.countDocuments({ isActive: true });
    const availableRooms = await Room.countDocuments({ status: 'available', isActive: true });
    const occupancyRate = totalRooms > 0 ? Math.round(((totalRooms - availableRooms) / totalRooms) * 100) : 0;

    const activeChats = await Message.countDocuments({ 
      status: 'unread',
      type: 'chat' 
    });

    // Calculate average rating from reviews
    const ratingData = await Message.aggregate([
      { $match: { type: 'review', rating: { $exists: true } } },
      { $group: { _id: null, avgRating: { $avg: '$rating' } } }
    ]);
    const averageRating = ratingData[0]?.avgRating || 4.5;

    // Get recent bookings
    const recentBookings = await Booking.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('bookingId guestName guestEmail roomType checkIn checkOut status totalAmount paymentStatus');

    // Get recent messages
    const recentMessages = await Message.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('type sender subject message status priority createdAt');

    const dashboardData = {
      stats: {
        totalBookings,
        todayBookings,
        totalRevenue,
        occupancyRate,
        activeChats,
        totalRooms,
        availableRooms,
        averageRating: parseFloat(averageRating.toFixed(1))
      },
      recentBookings: recentBookings.map(booking => ({
        id: booking._id,
        bookingId: booking.bookingId,
        guestName: booking.guestName,
        guestEmail: booking.guestEmail,
        roomType: booking.roomType,
        checkIn: booking.checkIn,
        checkOut: booking.checkOut,
        status: booking.status,
        totalAmount: booking.totalAmount,
        paymentStatus: booking.paymentStatus
      })),
      recentMessages: recentMessages.map(message => ({
        id: message._id,
        type: message.type,
        sender: message.sender.name,
        subject: message.subject,
        message: message.message.substring(0, 100) + (message.message.length > 100 ? '...' : ''),
        status: message.status,
        priority: message.priority,
        timestamp: message.createdAt
      }))
    };

    return NextResponse.json(dashboardData);

  } catch (error) {
    console.error('Dashboard API error:', error);
    return NextResponse.json(
      { error: 'Failed to load dashboard data' },
      { status: 500 }
    );
  }
}