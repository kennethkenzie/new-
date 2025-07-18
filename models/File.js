const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
    default: () => require('crypto').randomUUID()
  },
  filename: {
    type: String,
    required: true,
    trim: true
  },
  originalName: {
    type: String,
    required: true,
    trim: true
  },
  fileType: {
    type: String,
    required: true,
    enum: ['image', 'document']
  },
  mimeType: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        if (this.fileType === 'image') {
          return /^image\/(jpeg|jpg|png|gif|webp)$/i.test(v);
        } else if (this.fileType === 'document') {
          return /^(application\/(pdf|msword|vnd\.openxmlformats-officedocument\.wordprocessingml\.document|vnd\.ms-excel|vnd\.openxmlformats-officedocument\.spreadsheetml\.sheet)|text\/plain)$/i.test(v);
        }
        return false;
      },
      message: 'Invalid file type for the selected category'
    }
  },
  size: {
    type: Number,
    required: true,
    max: 10485760 // 10MB limit
  },
  data: {
    type: String,
    required: true // Base64 encoded file data
  },
  uploadedBy: {
    type: String,
    ref: 'User',
    required: true
  },
  uploadedByName: {
    type: String,
    required: true
  },
  description: {
    type: String,
    maxlength: 500
  },
  tags: [{
    type: String,
    trim: true
  }],
  isPublic: {
    type: Boolean,
    default: false
  },
  folder: {
    type: String,
    default: 'general',
    enum: ['general', 'rooms', 'events', 'gallery', 'documents', 'profiles']
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
  collection: 'files'
});

// Pre-save middleware to update timestamps
fileSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// Method to get file extension
fileSchema.methods.getFileExtension = function() {
  return this.originalName.split('.').pop().toLowerCase();
};

// Method to format file size
fileSchema.methods.getFormattedSize = function() {
  const bytes = this.size;
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// Static method to get allowed file types
fileSchema.statics.getAllowedTypes = function() {
  return {
    image: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'],
    document: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'text/plain']
  };
};

const File = mongoose.model('File', fileSchema);

module.exports = File;