const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const roleCheck = require('../middlewares/role');
const reportController = require('../controllers/reportController');

/**
 * @desc    Get library statistics
 * @route   GET /api/reports/stats
 * @access  Private (Librarian, Admin)
 */
router.get('/stats', auth, roleCheck(['librarian', 'admin']), reportController.getLibraryStats);

/**
 * @desc    Get overdue loans report
 * @route   GET /api/reports/overdue
 * @access  Private (Librarian, Admin)
 */
router.get('/overdue', auth, roleCheck(['librarian', 'admin']), reportController.getOverdueLoans);

/**
 * @desc    Get popular books report
 * @route   GET /api/reports/popular
 * @access  Private (Librarian, Admin)
 */
router.get('/popular', auth, roleCheck(['librarian', 'admin']), reportController.getPopularBooks);

module.exports = router;