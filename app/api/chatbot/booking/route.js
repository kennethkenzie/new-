import { NextResponse } from 'next/server';
import { DateTime } from 'luxon';

export async function POST(request) {
  try {
    const { checkIn, checkOut, adults, children, roomType, sessionId } = await request.json();
    
    if (!checkIn || !checkOut || !adults || !sessionId) {
      return NextResponse.json(
        { error: 'Missing required booking parameters' },
        { status: 400 }
      );
    }

    // Parse and validate dates
    const checkInDate = DateTime.fromISO(checkIn);
    const checkOutDate = DateTime.fromISO(checkOut);

    if (!checkInDate.isValid || !checkOutDate.isValid) {
      return NextResponse.json(
        { error: 'Invalid date format. Please use YYYY-MM-DD' },
        { status: 400 }
      );
    }

    if (checkOutDate <= checkInDate) {
      return NextResponse.json(
        { error: 'Check-out date must be after check-in date' },
        { status: 400 }
      );
    }

    // Mock booking system - in production, integrate with actual booking system
    const roomTypes = {
      'double': { name: 'Double Room', price: 278, maxOccupancy: 2 },
      'twin': { name: 'Twin Suite', price: 499, maxOccupancy: 4 },
      'executive': { name: 'Executive Suite', price: 599, maxOccupancy: 4 }
    };

    const selectedRoom = roomTypes[roomType] || roomTypes.double;
    const nights = Math.ceil(checkOutDate.diff(checkInDate, 'days').days);
    const totalPrice = selectedRoom.price * nights;

    // Check if room can accommodate guests
    const totalGuests = adults + (children || 0);
    if (totalGuests > selectedRoom.maxOccupancy) {
      return NextResponse.json(
        { error: `${selectedRoom.name} can only accommodate ${selectedRoom.maxOccupancy} guests` },
        { status: 400 }
      );
    }

    // Generate booking confirmation
    const bookingId = `LB${Date.now()}${Math.random().toString(36).substr(2, 5).toUpperCase()}`;
    
    const booking = {
      bookingId,
      sessionId,
      checkIn: checkInDate.toISODate(),
      checkOut: checkOutDate.toISODate(),
      nights,
      adults,
      children: children || 0,
      roomType: selectedRoom.name,
      pricePerNight: selectedRoom.price,
      totalPrice,
      status: 'confirmed',
      createdAt: new Date().toISOString()
    };

    // In production, save to database
    console.log('Booking created:', booking);

    return NextResponse.json({
      success: true,
      booking,
      message: `Booking confirmed! Your reservation ID is ${bookingId}. Total cost: $${totalPrice} for ${nights} nights.`
    });

  } catch (error) {
    console.error('Booking API error:', error);
    return NextResponse.json(
      { error: 'Failed to process booking' },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const sessionId = searchParams.get('sessionId');
  
  if (!sessionId) {
    return NextResponse.json(
      { error: 'SessionId is required' },
      { status: 400 }
    );
  }

  // In production, fetch from database
  // For now, return mock booking history
  return NextResponse.json({
    bookings: [],
    sessionId
  });
}