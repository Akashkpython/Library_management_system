const mongoose = require('mongoose');

/**
 * Item Schema
 * Represents a book or item in the library system
 */
const itemSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true,
    trim: true,
    maxlength: 200
  },
  author: { 
    type: String,
    trim: true,
    maxlength: 100
  },
  category: { 
    type: String,
    trim: true,
    maxlength: 50
  },
  description: { 
    type: String,
    trim: true,
    maxlength: 2000
  },
  price: { 
    type: Number, 
    default: 0,
    min: 0
  },
  currency: {
    type: String,
    default: 'INR',
    enum: ['INR', 'USD']
  },
  isFree: {
    type: Boolean,
    default: false
  },
  image: { 
    type: String,
    trim: true
  },
  quantity: { 
    type: Number, 
    default: 1,
    min: 0
  },
  available: { 
    type: Boolean, 
    default: true
  },
  isbn: { 
    type: String,
    trim: true,
    maxlength: 20
  },
  publisher: { 
    type: String,
    trim: true,
    maxlength: 100
  },
  publishedDate: { 
    type: Date
  },
  pages: { 
    type: Number,
    min: 1
  },
  language: { 
    type: String, 
    default: 'English',
    maxlength: 30
  },
  tags: [{
    type: String,
    trim: true
  }],
  // Online reading fields
  content: {
    type: String,
    trim: true
  },
  pdfUrl: {
    type: String,
    trim: true
  },
  epubUrl: {
    type: String,
    trim: true
  },
  readingProgress: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    currentPage: {
      type: Number,
      default: 0
    },
    lastRead: {
      type: Date,
      default: Date.now
    },
    finished: {
      type: Boolean,
      default: false
    }
  }],
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
itemSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

// Ensure quantity is not negative
itemSchema.pre('save', function (next) {
  if (this.quantity < 0) {
    this.quantity = 0;
  }
  next();
});

module.exports = mongoose.model('Item', itemSchema);