import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['chat', 'contact', 'review', 'complaint', 'inquiry'],
    default: 'chat'
  },
  sender: {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true
    },
    phone: {
      type: String,
      trim: true
    }
  },
  subject: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  message: {
    type: String,
    required: true,
    trim: true,
    maxlength: 2000
  },
  status: {
    type: String,
    enum: ['unread', 'read', 'replied', 'resolved', 'archived'],
    default: 'unread'
  },
  priority: {
    type: String,
    enum: ['low', 'normal', 'high', 'urgent'],
    default: 'normal'
  },
  category: {
    type: String,
    enum: ['booking', 'complaint', 'inquiry', 'feedback', 'support'],
    default: 'inquiry'
  },
  roomNumber: {
    type: String,
    trim: true,
    default: null
  },
  bookingId: {
    type: String,
    trim: true,
    default: null
  },
  sessionId: {
    type: String,
    trim: true,
    default: null
  },
  replies: [{
    sender: {
      type: String,
      required: true,
      enum: ['Guest', 'Admin', 'Staff']
    },
    message: {
      type: String,
      required: true,
      trim: true
    },
    timestamp: {
      type: Date,
      default: Date.now
    },
    sentBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null
    }
  }],
  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: null
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  resolvedAt: {
    type: Date,
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
MessageSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

export default mongoose.models.Message || mongoose.model('Message', MessageSchema);