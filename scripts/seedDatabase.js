import connectDB from '../lib/mongodb.js';
import User from '../models/User.js';
import Room from '../models/Room.js';
import Booking from '../models/Booking.js';
import Message from '../models/Message.js';

export async function seedDatabase() {
  try {
    await connectDB();
    console.log('🌱 Starting database seeding...');

    // Clear existing data
    await User.deleteMany({});
    await Room.deleteMany({});
    await Booking.deleteMany({});
    await Message.deleteMany({});

    // Create default admin user
    const adminUser = await User.create({
      username: 'admin',
      email: 'admin@labrezisuites.com',
      password: 'labrezi123', // Will be hashed automatically
      role: 'admin',
      name: 'Hotel Administrator',
      phone: '+256 753 208767',
      isActive: true
    });

    // Create additional users
    const managerUser = await User.create({
      username: 'manager',
      email: 'manager@labrezisuites.com',
      password: 'manager123',
      role: 'manager',
      name: 'Hotel Manager',
      phone: '+256 753 208768',
      isActive: true
    });

    const staffUser = await User.create({
      username: 'staff',
      email: 'staff@labrezisuites.com',
      password: 'staff123',
      role: 'staff',
      name: 'Hotel Staff',
      phone: '+256 753 208769',
      isActive: true
    });

    console.log('✅ Users created successfully');

    // Create sample rooms
    const rooms = [
      {
        name: 'Executive Suite',
        number: '301',
        type: 'executive',
        floor: 3,
        capacity: 2,
        bedCount: 1,
        bedType: 'king',
        area: 45,
        pricing: {
          basePrice: 299,
          weekendPrice: 349
        },
        status: 'available',
        amenities: ['wifi', 'tv', 'minibar', 'balcony', 'ac', 'safe', 'bathtub', 'desk'],
        description: 'Luxurious executive suite with panoramic city views, king-size bed, and separate living area.',
        features: [
          'Panoramic city views',
          'Separate living area',
          'Work desk',
          'Premium bedding',
          'Marble bathroom',
          'Complimentary breakfast'
        ],
        view: 'city',
        isActive: true
      },
      {
        name: 'Double Room',
        number: '205',
        type: 'double',
        floor: 2,
        capacity: 2,
        bedCount: 1,
        bedType: 'queen',
        area: 30,
        pricing: {
          basePrice: 199,
          weekendPrice: 229
        },
        status: 'occupied',
        amenities: ['wifi', 'tv', 'ac', 'safe', 'shower'],
        description: 'Comfortable double room with modern amenities and garden views.',
        features: [
          'Garden views',
          'Modern bathroom',
          'Work desk',
          'Complimentary WiFi',
          'Daily housekeeping'
        ],
        view: 'garden',
        isActive: true
      },
      {
        name: 'Single Room',
        number: '102',
        type: 'single',
        floor: 1,
        capacity: 1,
        bedCount: 1,
        bedType: 'single',
        area: 20,
        pricing: {
          basePrice: 149,
          weekendPrice: 169
        },
        status: 'maintenance',
        amenities: ['wifi', 'tv', 'ac', 'shower'],
        description: 'Cozy single room perfect for solo travelers.',
        features: [
          'Compact design',
          'Work desk',
          'Modern bathroom',
          'Complimentary WiFi'
        ],
        view: 'courtyard',
        isActive: true
      }
    ];

    const createdRooms = await Room.insertMany(rooms);
    console.log('✅ Rooms created successfully');

    // Create sample bookings
    const bookings = [
      {
        bookingId: 'LB20250118001',
        guestName: 'John Smith',
        guestEmail: 'john.smith@example.com',
        guestPhone: '+1 234 567 8900',
        roomType: 'executive',
        roomNumber: '301',
        checkIn: new Date('2025-01-20'),
        checkOut: new Date('2025-01-23'),
        guests: {
          adults: 2,
          children: 0
        },
        totalAmount: 1200,
        status: 'confirmed',
        paymentStatus: 'paid',
        specialRequests: 'Late checkout requested',
        source: 'website',
        createdBy: adminUser._id
      },
      {
        bookingId: 'LB20250118002',
        guestName: 'Maria Garcia',
        guestEmail: 'maria.garcia@example.com',
        guestPhone: '+1 234 567 8901',
        roomType: 'double',
        roomNumber: '205',
        checkIn: new Date('2025-01-21'),
        checkOut: new Date('2025-01-24'),
        guests: {
          adults: 2,
          children: 1
        },
        totalAmount: 850,
        status: 'pending',
        paymentStatus: 'pending',
        specialRequests: 'Ground floor room',
        source: 'phone',
        createdBy: managerUser._id
      },
      {
        bookingId: 'LB20250118003',
        guestName: 'David Johnson',
        guestEmail: 'david.johnson@example.com',
        guestPhone: '+1 234 567 8902',
        roomType: 'single',
        roomNumber: '102',
        checkIn: new Date('2025-01-22'),
        checkOut: new Date('2025-01-25'),
        guests: {
          adults: 1,
          children: 0
        },
        totalAmount: 600,
        status: 'confirmed',
        paymentStatus: 'paid',
        specialRequests: 'None',
        source: 'booking.com',
        createdBy: adminUser._id
      }
    ];

    const createdBookings = await Booking.insertMany(bookings);
    console.log('✅ Bookings created successfully');

    // Create sample messages
    const messages = [
      {
        type: 'chat',
        sender: {
          name: 'John Smith',
          email: 'john.smith@example.com',
          phone: '+1 234 567 8900'
        },
        subject: 'Room Service Query',
        message: 'Hi, I would like to know what time room service is available until? Also, do you have vegetarian options?',
        status: 'unread',
        priority: 'normal',
        category: 'inquiry',
        roomNumber: '301',
        bookingId: 'LB20250118001',
        sessionId: 'chat_12345',
        replies: [{
          sender: 'Admin',
          message: 'Hello! Room service is available until 11 PM. Yes, we have many vegetarian options available.',
          timestamp: new Date('2025-01-18T10:45:00Z'),
          sentBy: adminUser._id
        }]
      },
      {
        type: 'contact',
        sender: {
          name: 'Maria Garcia',
          email: 'maria.garcia@example.com',
          phone: '+1 234 567 8901'
        },
        subject: 'Booking Inquiry',
        message: 'Hello, I am interested in booking a room for next weekend. Do you have any availability for 2 adults and 1 child?',
        status: 'unread',
        priority: 'high',
        category: 'booking',
        replies: []
      },
      {
        type: 'review',
        sender: {
          name: 'Sarah Wilson',
          email: 'sarah.wilson@example.com',
          phone: '+1 234 567 8903'
        },
        subject: 'Great Stay Review',
        message: 'We had a wonderful stay at your hotel. The staff was very friendly and the room was clean and comfortable. Thank you!',
        status: 'read',
        priority: 'normal',
        category: 'feedback',
        roomNumber: '401',
        rating: 5,
        replies: []
      }
    ];

    const createdMessages = await Message.insertMany(messages);
    console.log('✅ Messages created successfully');

    console.log('🎉 Database seeding completed successfully!');
    
    return {
      users: [adminUser, managerUser, staffUser],
      rooms: createdRooms,
      bookings: createdBookings,
      messages: createdMessages
    };

  } catch (error) {
    console.error('❌ Database seeding failed:', error);
    throw error;
  }
}

// Auto-run if this file is executed directly
if (process.argv[1] === new URL(import.meta.url).pathname) {
  seedDatabase()
    .then(() => {
      console.log('✅ Seeding completed');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Seeding failed:', error);
      process.exit(1);
    });
}