import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Mock dashboard data - in production, this would come from your database
    const dashboardData = {
      stats: {
        totalBookings: 156,
        todayBookings: 8,
        totalRevenue: 45670,
        occupancyRate: 78,
        activeChats: 12,
        totalRooms: 25,
        availableRooms: 7,
        averageRating: 4.6
      },
      recentBookings: [
        {
          id: 1,
          guestName: 'John Smith',
          room: 'Executive Suite',
          checkIn: '2025-01-20',
          checkOut: '2025-01-23',
          status: 'confirmed',
          amount: 1200
        },
        {
          id: 2,
          guestName: 'Maria Garcia',
          room: 'Double Room',
          checkIn: '2025-01-21',
          checkOut: '2025-01-24',
          status: 'pending',
          amount: 850
        },
        {
          id: 3,
          guestName: 'David Johnson',
          room: 'Single Room',
          checkIn: '2025-01-22',
          checkOut: '2025-01-25',
          status: 'confirmed',
          amount: 600
        }
      ],
      recentMessages: [
        {
          id: 1,
          sender: 'Guest Chat',
          message: 'What time is checkout?',
          timestamp: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
          unread: true
        },
        {
          id: 2,
          sender: 'Sarah M.',
          message: 'Room service request for room 205',
          timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
          unread: true
        },
        {
          id: 3,
          sender: 'Front Desk',
          message: 'New guest arriving early',
          timestamp: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
          unread: false
        }
      ]
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