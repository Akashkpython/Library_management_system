const Loan = require('../models/Loan');
const Item = require('../models/Item');
const User = require('../models/User');
const Notification = require('../models/Notification');

/**
 * @desc    Borrow an item
 * @route   POST /api/loans/borrow
 * @access  Private (User, Librarian, Admin)
 */
exports.borrowItem = async (req, res) => {
  try {
    const { itemId, days } = req.body;
    const userId = req.user.id;

    // Validation
    if (!itemId || !days) {
      return res.status(400).json({ 
        success: false,
        message: "Item ID and days are required" 
      });
    }

    // Check if item exists and is available
    const item = await Item.findById(itemId);
    if (!item) {
      return res.status(404).json({ 
        success: false,
        message: "Item not found" 
      });
    }

    if (!item.available || item.quantity <= 0) {
      return res.status(400).json({ 
        success: false,
        message: "Item is not available for borrowing" 
      });
    }

    // Check if user already has this item borrowed
    const existingLoan = await Loan.findOne({
      user: userId,
      item: itemId,
      status: 'borrowed'
    });

    if (existingLoan) {
      return res.status(400).json({ 
        success: false,
        message: "You have already borrowed this item" 
      });
    }

    // Calculate due date
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + parseInt(days));
    
    // Calculate fine per day (can be adjusted as needed)
    const finePerDay = 10; // ₹10 per day overdue

    // Create loan
    const loan = await Loan.create({
      user: userId,
      item: itemId,
      dueDate,
      fineAmount: 0 // Initially no fine
    });

    // Update item availability
    item.quantity -= 1;
    if (item.quantity === 0) {
      item.available = false;
    }
    await item.save();

    // Create notification
    await Notification.create({
      user: userId,
      title: "Item Borrowed",
      message: `You have borrowed "${item.title}". Due date is ${dueDate.toDateString()}.`,
      type: "info"
    });

    res.status(201).json({
      success: true,
      message: "Item borrowed successfully",
      data: loan
    });
  } catch (err) {
    console.error("Borrow item error:", err);
    res.status(500).json({ 
      success: false,
      message: "Error borrowing item",
      error: err.message 
    });
  }
};

/**
 * @desc    Return an item
 * @route   POST /api/loans/return/:id
 * @access  Private (User, Librarian, Admin)
 */
exports.returnItem = async (req, res) => {
  try {
    const loanId = req.params.id;
    const userId = req.user.id;

    // Find loan
    const loan = await Loan.findById(loanId).populate('item');
    if (!loan) {
      return res.status(404).json({ 
        success: false,
        message: "Loan not found" 
      });
    }

    // Check if loan belongs to user or user is admin/librarian
    if (loan.user.toString() !== userId && req.user.role === 'user') {
      return res.status(403).json({ 
        success: false,
        message: "Not authorized to return this item" 
      });
    }

    // Check if loan is already returned
    if (loan.status === 'returned') {
      return res.status(400).json({ 
        success: false,
        message: "Item is already returned" 
      });
    }

    // Calculate fine if overdue
    let fineAmount = 0;
    const currentDate = new Date();
    if (currentDate > loan.dueDate) {
      // Calculate days overdue
      const timeDiff = Math.abs(currentDate.getTime() - loan.dueDate.getTime());
      const daysOverdue = Math.ceil(timeDiff / (1000 * 3600 * 24));
      fineAmount = daysOverdue * 10; // ₹10 per day
    }

    // Update loan
    loan.returnDate = currentDate;
    loan.status = 'returned';
    loan.fineAmount = fineAmount;
    await loan.save();

    // Update item availability
    const item = loan.item;
    item.quantity += 1;
    item.available = true;
    await item.save();

    // Create notification
    let notificationMessage = `You have returned "${item.title}".`;
    if (fineAmount > 0) {
      notificationMessage += ` Overdue fine: ₹${fineAmount}.`;
    }
    
    await Notification.create({
      user: loan.user,
      title: "Item Returned",
      message: notificationMessage,
      type: fineAmount > 0 ? "warning" : "success"
    });

    res.status(200).json({
      success: true,
      message: "Item returned successfully",
      data: loan,
      fineAmount: fineAmount
    });
  } catch (err) {
    console.error("Return item error:", err);
    res.status(500).json({ 
      success: false,
      message: "Error returning item",
      error: err.message 
    });
  }
};

/**
 * @desc    Get all loans
 * @route   GET /api/loans/all
 * @access  Private (Librarian, Admin)
 */
exports.getAllLoans = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const loans = await Loan.find()
      .populate('user', 'name email')
      .populate('item', 'title author')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Loan.countDocuments();

    res.status(200).json({
      success: true,
      count: loans.length,
      total,
      page,
      pages: Math.ceil(total / limit),
      data: loans
    });
  } catch (err) {
    console.error("Get all loans error:", err);
    res.status(500).json({ 
      success: false,
      message: "Error fetching loans",
      error: err.message 
    });
  }
};

/**
 * @desc    Get user's loans
 * @route   GET /api/loans/my
 * @access  Private (User, Librarian, Admin)
 */
exports.getMyLoans = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const loans = await Loan.find({ user: req.user.id })
      .populate('item', 'title author')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Loan.countDocuments({ user: req.user.id });

    res.status(200).json({
      success: true,
      count: loans.length,
      total,
      page,
      pages: Math.ceil(total / limit),
      data: loans
    });
  } catch (err) {
    console.error("Get my loans error:", err);
    res.status(500).json({ 
      success: false,
      message: "Error fetching your loans",
      error: err.message 
    });
  }
};

/**
 * @desc    Renew a loan
 * @route   POST /api/loans/renew/:id
 * @access  Private (User, Librarian, Admin)
 */
exports.renewLoan = async (req, res) => {
  try {
    const loanId = req.params.id;
    const userId = req.user.id;
    const { days } = req.body;

    // Find loan
    const loan = await Loan.findById(loanId).populate('item');
    if (!loan) {
      return res.status(404).json({ 
        success: false,
        message: "Loan not found" 
      });
    }

    // Check if loan belongs to user or user is admin/librarian
    if (loan.user.toString() !== userId && req.user.role === 'user') {
      return res.status(403).json({ 
        success: false,
        message: "Not authorized to renew this loan" 
      });
    }

    // Check if loan is already returned
    if (loan.status === 'returned') {
      return res.status(400).json({ 
        success: false,
        message: "Cannot renew a returned item" 
      });
    }

    // Check renewal limit (max 3 times)
    if (loan.renewalCount >= 3) {
      return res.status(400).json({ 
        success: false,
        message: "Maximum renewal limit reached" 
      });
    }

    // Update due date
    const newDueDate = new Date(loan.dueDate);
    newDueDate.setDate(newDueDate.getDate() + (parseInt(days) || 7));

    loan.dueDate = newDueDate;
    loan.renewed = true;
    loan.renewalCount += 1;
    await loan.save();

    // Create notification
    await Notification.create({
      user: loan.user,
      title: "Loan Renewed",
      message: `Your loan for "${loan.item.title}" has been renewed. New due date is ${newDueDate.toDateString()}.`,
      type: "info"
    });

    res.status(200).json({
      success: true,
      message: "Loan renewed successfully",
      data: loan
    });
  } catch (err) {
    console.error("Renew loan error:", err);
    res.status(500).json({ 
      success: false,
      message: "Error renewing loan",
      error: err.message 
    });
  }
};