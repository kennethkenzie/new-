import mongoose from 'mongoose';

const BookingSchema = new mongoose.Schema({
  bookingId: {
    type: String,
    required: true,
    unique: true
  },
  guestName: {
    type: String,
    required: true,
    trim: true
  },
  guestEmail: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  guestPhone: {
    type: String,
    required: true,
    trim: true
  },
  roomType: {
    type: String,
    required: true,
    enum: ['single', 'double', 'executive', 'suite']
  },
  roomNumber: {
    type: String,
    default: null
  },
  checkIn: {
    type: Date,
    required: true
  },
  checkOut: {
    type: Date,
    required: true
  },
  guests: {
    adults: {
      type: Number,
      required: true,
      min: 1,
      max: 10
    },
    children: {
      type: Number,
      default: 0,
      min: 0,
      max: 10
    }
  },
  totalAmount: {
    type: Number,
    required: true,
    min: 0
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled', 'checked-in', 'checked-out', 'no-show'],
    default: 'pending'
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'partial', 'paid', 'refunded'],
    default: 'pending'
  },
  specialRequests: {
    type: String,
    trim: true,
    default: ''
  },
  source: {
    type: String,
    enum: ['website', 'phone', 'walk-in', 'booking.com', 'expedia', 'airbnb'],
    default: 'website'
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
BookingSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// Generate booking ID
BookingSchema.pre('save', async function(next) {
  if (!this.bookingId) {
    const year = new Date().getFullYear();
    const month = String(new Date().getMonth() + 1).padStart(2, '0');
    const day = String(new Date().getDate()).padStart(2, '0');
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    this.bookingId = `LB${year}${month}${day}${random}`;
  }
  next();
});

export default mongoose.models.Booking || mongoose.model('Booking', BookingSchema);