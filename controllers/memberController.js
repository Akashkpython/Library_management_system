const User = require('../models/User');
const Loan = require('../models/Loan');

/**
 * @desc    Get all members
 * @route   GET /api/members
 * @access  Private (Librarian, Admin)
 */
exports.getAllMembers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Exclude admin users from member list
    const members = await User.find({ role: { $ne: 'admin' } })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await User.countDocuments({ role: { $ne: 'admin' } });

    res.status(200).json({
      success: true,
      count: members.length,
      total,
      page,
      pages: Math.ceil(total / limit),
      data: members
    });
  } catch (err) {
    console.error("Get all members error:", err);
    res.status(500).json({ 
      success: false,
      message: "Error fetching members",
      error: err.message 
    });
  }
};

/**
 * @desc    Get member by ID
 * @route   GET /api/members/:id
 * @access  Private (Librarian, Admin)
 */
exports.getMemberById = async (req, res) => {
  try {
    const member = await User.findById(req.params.id).select('-password');
    
    if (!member) {
      return res.status(404).json({ 
        success: false,
        message: "Member not found" 
      });
    }

    res.status(200).json({
      success: true,
      data: member
    });
  } catch (err) {
    console.error("Get member error:", err);
    res.status(500).json({ 
      success: false,
      message: "Error fetching member",
      error: err.message 
    });
  }
};

/**
 * @desc    Update member
 * @route   PUT /api/members/:id
 * @access  Private (Librarian, Admin)
 */
exports.updateMember = async (req, res) => {
  try {
    const { name, email, role, isActive } = req.body;

    const member = await User.findByIdAndUpdate(
      req.params.id,
      {
        name,
        email,
        role,
        isActive,
        updatedAt: Date.now()
      },
      { 
        new: true, 
        runValidators: true 
      }
    ).select('-password');

    if (!member) {
      return res.status(404).json({ 
        success: false,
        message: "Member not found" 
      });
    }

    res.status(200).json({
      success: true,
      message: "Member updated successfully",
      data: member
    });
  } catch (err) {
    console.error("Update member error:", err);
    res.status(400).json({ 
      success: false,
      message: "Error updating member",
      error: err.message 
    });
  }
};

/**
 * @desc    Delete member
 * @route   DELETE /api/members/:id
 * @access  Private (Admin)
 */
exports.deleteMember = async (req, res) => {
  try {
    const member = await User.findByIdAndDelete(req.params.id);
    
    if (!member) {
      return res.status(404).json({ 
        success: false,
        message: "Member not found" 
      });
    }

    res.status(200).json({
      success: true,
      message: "Member deleted successfully"
    });
  } catch (err) {
    console.error("Delete member error:", err);
    res.status(500).json({ 
      success: false,
      message: "Error deleting member",
      error: err.message 
    });
  }
};

/**
 * @desc    Get member activity (borrowing history)
 * @route   GET /api/members/:id/activity
 * @access  Private (Librarian, Admin)
 */
exports.getMemberActivity = async (req, res) => {
  try {
    const member = await User.findById(req.params.id).select('-password');
    
    if (!member) {
      return res.status(404).json({ 
        success: false,
        message: "Member not found" 
      });
    }

    // Populate loan history
    const loans = await Loan.find({ user: member._id })
      .populate('item', 'title author')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: {
        member,
        loans
      }
    });
  } catch (err) {
    console.error("Get member activity error:", err);
    res.status(500).json({ 
      success: false,
      message: "Error fetching member activity",
      error: err.message 
    });
  }
};