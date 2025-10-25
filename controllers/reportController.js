const Loan = require('../models/Loan');
const Item = require('../models/Item');
const User = require('../models/User');

/**
 * @desc    Get library statistics
 * @route   GET /api/reports/stats
 * @access  Private (Librarian, Admin)
 */
exports.getLibraryStats = async (req, res) => {
  try {
    // Get total counts
    const totalBooks = await Item.countDocuments();
    const totalMembers = await User.countDocuments({ role: { $ne: 'admin' } });
    const totalLoans = await Loan.countDocuments();
    
    // Get active loans
    const activeLoans = await Loan.countDocuments({ status: 'borrowed' });
    
    // Get overdue loans
    const currentDate = new Date();
    const overdueLoans = await Loan.countDocuments({ 
      status: 'borrowed', 
      dueDate: { $lt: currentDate } 
    });
    
    // Get books by category
    const booksByCategory = await Item.aggregate([
      { $group: { _id: "$category", count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);
    
    // Get recent activity (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const recentLoans = await Loan.countDocuments({
      createdAt: { $gte: thirtyDaysAgo }
    });
    
    const recentReturns = await Loan.countDocuments({
      returnDate: { $gte: thirtyDaysAgo }
    });

    res.status(200).json({
      success: true,
      data: {
        totals: {
          books: totalBooks,
          members: totalMembers,
          loans: totalLoans,
          activeLoans: activeLoans,
          overdueLoans: overdueLoans
        },
        booksByCategory,
        recentActivity: {
          loans: recentLoans,
          returns: recentReturns
        }
      }
    });
  } catch (err) {
    console.error("Get library stats error:", err);
    res.status(500).json({ 
      success: false,
      message: "Error fetching library statistics",
      error: err.message 
    });
  }
};

/**
 * @desc    Get overdue loans report
 * @route   GET /api/reports/overdue
 * @access  Private (Librarian, Admin)
 */
exports.getOverdueLoans = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const currentDate = new Date();
    
    const overdueLoans = await Loan.find({ 
      status: 'borrowed', 
      dueDate: { $lt: currentDate } 
    })
    .populate('user', 'name email')
    .populate('item', 'title author')
    .sort({ dueDate: 1 }) // Oldest overdue first
    .skip(skip)
    .limit(limit);

    const total = await Loan.countDocuments({ 
      status: 'borrowed', 
      dueDate: { $lt: currentDate } 
    });

    // Calculate overdue days and fines
    const overdueLoansWithDetails = overdueLoans.map(loan => {
      const timeDiff = Math.abs(currentDate.getTime() - loan.dueDate.getTime());
      const daysOverdue = Math.ceil(timeDiff / (1000 * 3600 * 24));
      const fineAmount = daysOverdue * 10; // ₹10 per day
      
      return {
        ...loan.toObject(),
        daysOverdue,
        fineAmount
      };
    });

    res.status(200).json({
      success: true,
      count: overdueLoansWithDetails.length,
      total,
      page,
      pages: Math.ceil(total / limit),
      data: overdueLoansWithDetails
    });
  } catch (err) {
    console.error("Get overdue loans error:", err);
    res.status(500).json({ 
      success: false,
      message: "Error fetching overdue loans",
      error: err.message 
    });
  }
};

/**
 * @desc    Get popular books report
 * @route   GET /api/reports/popular
 * @access  Private (Librarian, Admin)
 */
exports.getPopularBooks = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    
    // Get most borrowed books
    const popularBooks = await Loan.aggregate([
      { $match: { status: { $in: ['borrowed', 'returned'] } } },
      { $group: { _id: "$item", borrowCount: { $sum: 1 } } },
      { $sort: { borrowCount: -1 } },
      { $limit: limit },
      {
        $lookup: {
          from: "items",
          localField: "_id",
          foreignField: "_id",
          as: "book"
        }
      },
      { $unwind: "$book" },
      {
        $project: {
          _id: "$book._id",
          title: "$book.title",
          author: "$book.author",
          category: "$book.category",
          borrowCount: 1
        }
      }
    ]);

    res.status(200).json({
      success: true,
      count: popularBooks.length,
      data: popularBooks
    });
  } catch (err) {
    console.error("Get popular books error:", err);
    res.status(500).json({ 
      success: false,
      message: "Error fetching popular books",
      error: err.message 
    });
  }
};