const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const roleCheck = require('../middlewares/role');
const memberController = require('../controllers/memberController');

/**
 * @desc    Get all members
 * @route   GET /api/members
 * @access  Private (Librarian, Admin)
 */
router.get('/', auth, roleCheck(['librarian', 'admin']), memberController.getAllMembers);

/**
 * @desc    Get member by ID
 * @route   GET /api/members/:id
 * @access  Private (Librarian, Admin)
 */
router.get('/:id', auth, roleCheck(['librarian', 'admin']), memberController.getMemberById);

/**
 * @desc    Update member
 * @route   PUT /api/members/:id
 * @access  Private (Librarian, Admin)
 */
router.put('/:id', auth, roleCheck(['librarian', 'admin']), memberController.updateMember);

/**
 * @desc    Delete member
 * @route   DELETE /api/members/:id
 * @access  Private (Admin)
 */
router.delete('/:id', auth, roleCheck(['admin']), memberController.deleteMember);

/**
 * @desc    Get member activity (borrowing history)
 * @route   GET /api/members/:id/activity
 * @access  Private (Librarian, Admin)
 */
router.get('/:id/activity', auth, roleCheck(['librarian', 'admin']), memberController.getMemberActivity);

module.exports = router;