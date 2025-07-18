import mongoose from 'mongoose';

const RoomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  number: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  type: {
    type: String,
    required: true,
    enum: ['single', 'double', 'executive', 'suite']
  },
  floor: {
    type: Number,
    required: true,
    min: 1
  },
  capacity: {
    type: Number,
    required: true,
    min: 1,
    max: 10
  },
  bedCount: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  bedType: {
    type: String,
    enum: ['single', 'double', 'queen', 'king', 'twin'],
    default: 'double'
  },
  area: {
    type: Number, // in square meters
    required: true,
    min: 10
  },
  pricing: {
    basePrice: {
      type: Number,
      required: true,
      min: 0
    },
    weekendPrice: {
      type: Number,
      required: true,
      min: 0
    },
    seasonalPricing: [{
      startDate: Date,
      endDate: Date,
      price: Number
    }]
  },
  status: {
    type: String,
    enum: ['available', 'occupied', 'maintenance', 'reserved', 'out-of-order'],
    default: 'available'
  },
  amenities: [{
    type: String,
    enum: ['wifi', 'tv', 'minibar', 'balcony', 'ac', 'safe', 'telephone', 'bathtub', 'shower', 'desk', 'sofa']
  }],
  images: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'File'
  }],
  description: {
    type: String,
    trim: true,
    maxlength: 1000
  },
  features: [{
    type: String,
    trim: true
  }],
  view: {
    type: String,
    enum: ['city', 'garden', 'pool', 'mountain', 'courtyard'],
    default: 'garden'
  },
  isActive: {
    type: Boolean,
    default: true
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
RoomSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

export default mongoose.models.Room || mongoose.model('Room', RoomSchema);