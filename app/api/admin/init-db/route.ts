import { NextRequest, NextResponse } from 'next/server';
import { seedDatabase } from '../../../../scripts/seedDatabase.js';

export async function POST(request: NextRequest) {
  try {
    // Check if this is a development environment
    if (process.env.NODE_ENV === 'production') {
      return NextResponse.json({ error: 'Database seeding is not allowed in production' }, { status: 403 });
    }

    console.log('🌱 Starting database initialization...');
    const result = await seedDatabase();
    
    return NextResponse.json({
      success: true,
      message: 'Database initialized successfully',
      data: {
        usersCreated: result.users.length,
        roomsCreated: result.rooms.length,
        bookingsCreated: result.bookings.length,
        messagesCreated: result.messages.length
      }
    });

  } catch (error) {
    console.error('Database initialization error:', error);
    return NextResponse.json({ 
      error: 'Database initialization failed',
      details: error.message 
    }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  return NextResponse.json({
    message: 'Database initialization endpoint',
    methods: ['POST'],
    description: 'Send a POST request to initialize the database with sample data'
  });
}