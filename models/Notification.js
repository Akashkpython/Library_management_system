const mongoose = require('mongoose');

/**
 * Notification Schema
 * Represents a notification for a user
 */
const notificationSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true,
    index: true
  },
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  message: { 
    type: String, 
    required: true,
    trim: true,
    maxlength: 500
  },
  type: {
    type: String,
    enum: ['info', 'warning', 'error', 'success'],
    default: 'info'
  },
  read: { 
    type: Boolean, 
    default: false
  },
  relatedEntity: {
    type: {
      id: mongoose.Schema.Types.ObjectId,
      model: String
    }
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

// Index for efficient querying
notificationSchema.index({ user: 1, read: 1 });
notificationSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Notification', notificationSchema);