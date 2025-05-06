import { NextResponse } from 'next/server';
import { DateTime } from 'luxon';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const checkIn = new Date(searchParams.get('checkIn'));
  const checkOut = new Date(searchParams.get('checkOut'));
  const adults = parseInt(searchParams.get('adults')) || 2;
  const children = parseInt(searchParams.get('children')) || 0;

  // This would come from your database in a real application
  const allRooms = [
    {
      id: 1,
      name: "Deluxe Room",
      description: "Spacious room with king bed and city view",
      maxOccupancy: 2,
      price: 199,
      availableDates: ['2025-04-01', '2025-04-02', '2025-04-03'],
      image: "/images/deluxe-room.jpg"
    },
    // ... more room data
  ];

  // Filter rooms based on availability and occupancy
  const availableRooms = allRooms.filter(room => {
    // Check if room can accommodate guests
    const canAccommodate = (adults + children) <= room.maxOccupancy;
    
    // Check if room is available for all dates in the range
    const isAvailable = checkDateRangeAvailability(room, checkIn, checkOut);
    
    return canAccommodate && isAvailable;
  });

  return NextResponse.json({ availableRooms });
}

function checkDateRangeAvailability(room, checkIn, checkOut) {
  // Convert dates to ISO strings for comparison
  const checkInStr = checkIn.toISOString().split('T')[0];
  const checkOutStr = checkOut.toISOString().split('T')[0];
  
  // This is a simplified check - in a real app you'd check each date in the range
  return room.availableDates.includes(checkInStr) && 
         room.availableDates.includes(checkOutStr);
}