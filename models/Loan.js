const mongoose = require('mongoose');

/**
 * Loan Schema
 * Represents a loan transaction in the system
 */
const loanSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true,
    index: true
  },
  item: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Item', 
    required: true,
    index: true
  },
  borrowDate: { 
    type: Date, 
    default: Date.now
  },
  dueDate: { 
    type: Date, 
    required: true
  },
  returnDate: { 
    type: Date
  },
  status: { 
    type: String, 
    enum: ['borrowed', 'returned', 'overdue'], 
    default: 'borrowed',
    index: true
  },
  fineAmount: {
    type: Number,
    default: 0,
    min: 0
  },
  notes: {
    type: String,
    trim: true,
    maxlength: 500
  },
  renewed: {
    type: Boolean,
    default: false
  },
  renewalCount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Index for efficient querying
loanSchema.index({ user: 1, status: 1 });
loanSchema.index({ item: 1, status: 1 });
loanSchema.index({ dueDate: 1, status: 1 });

// Calculate if loan is overdue
loanSchema.virtual('isOverdue').get(function() {
  return this.status === 'borrowed' && this.dueDate < new Date();
});

// Calculate days overdue
loanSchema.virtual('daysOverdue').get(function() {
  if (this.status === 'borrowed' && this.dueDate < new Date()) {
    const diffTime = Math.abs(new Date() - this.dueDate);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }
  return 0;
});

// Ensure virtual fields are serialized
loanSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Loan', loanSchema);