import { NextResponse } from 'next/server';
import { DateTime } from 'luxon';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  
  try {
    // Parse and validate dates using Luxon
    const checkIn = DateTime.fromISO(searchParams.get('checkIn'));
    const checkOut = DateTime.fromISO(searchParams.get('checkOut'));
    const adults = parseInt(searchParams.get('adults')) || 2;
    const children = parseInt(searchParams.get('children')) || 0;

    // Validate input
    if (!checkIn.isValid || !checkOut.isValid) {
      return NextResponse.json(
        { error: 'Invalid date format. Please use YYYY-MM-DD' },
        { status: 400 }
      );
    }

    if (checkOut <= checkIn) {
      return NextResponse.json(
        { error: 'Check-out date must be after check-in date' },
        { status: 400 }
      );
    }

    // This would come from your database in a real application
    const allRooms = [
      {
        id: 1,
        name: "Deluxe Room",
        description: "Spacious room with king bed and city view",
        maxOccupancy: 3,
        price: 199,
        availableDates: ['2025-04-01', '2025-04-02', '2025-04-03', '2025-04-04', '2025-04-05'],
        image: "/images/deluxe-room.jpg"
      },
      {
        id: 2,
        name: "Family Suite",
        description: "Large suite perfect for families",
        maxOccupancy: 5,
        price: 299,
        availableDates: ['2025-04-01', '2025-04-02', '2025-04-05', '2025-04-06'],
        image: "/images/family-suite.jpg"
      }
    ];

    // Filter rooms based on availability and occupancy
    const availableRooms = allRooms.filter(room => {
      // Check if room can accommodate guests
      const canAccommodate = (adults + children) <= room.maxOccupancy;
      
      // Check if room is available for all dates in the range
      const isAvailable = checkDateRangeAvailability(room, checkIn, checkOut);
      
      return canAccommodate && isAvailable;
    });

    return NextResponse.json({ 
      availableRooms,
      checkIn: checkIn.toISODate(),
      checkOut: checkOut.toISODate(),
      adults,
      children
    });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json(
      { error: 'An error occurred while processing your request' },
      { status: 500 }
    );
  }
}

function checkDateRangeAvailability(room, checkIn, checkOut) {
  // Generate all dates in the range
  let current = checkIn;
  while (current <= checkOut) {
    const dateStr = current.toISODate();
    if (!room.availableDates.includes(dateStr)) {
      return false;
    }
    current = current.plus({ days: 1 });
  }
  return true;
}