const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
    default: () => require('crypto').randomUUID()
  },
  name: {
    type: String,
    required: true,
    unique: true,
    enum: ['admin', 'manager', 'receptionist']
  },
  permissions: [{
    type: String,
    enum: [
      'user_management',
      'file_management', 
      'booking_management',
      'room_management',
      'message_management',
      'dashboard_access',
      'content_management'
    ]
  }],
  description: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true,
  collection: 'roles'
});

// Pre-save middleware to update timestamps
roleSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

const Role = mongoose.model('Role', roleSchema);

module.exports = Role;