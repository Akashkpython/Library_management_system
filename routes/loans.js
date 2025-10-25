const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const roleCheck = require('../middlewares/role');
const loanController = require('../controllers/loanController');

/**
 * @desc    Borrow an item
 * @route   POST /api/loans/borrow
 * @access  Private (User, Librarian, Admin)
 */
router.post('/borrow', auth, roleCheck(['user', 'librarian', 'admin']), loanController.borrowItem);

/**
 * @desc    Return an item
 * @route   POST /api/loans/return/:id
 * @access  Private (User, Librarian, Admin)
 */
router.post('/return/:id', auth, roleCheck(['user', 'librarian', 'admin']), loanController.returnItem);

/**
 * @desc    Renew a loan
 * @route   POST /api/loans/renew/:id
 * @access  Private (User, Librarian, Admin)
 */
router.post('/renew/:id', auth, roleCheck(['user', 'librarian', 'admin']), loanController.renewLoan);

/**
 * @desc    Get user's loans
 * @route   GET /api/loans/my
 * @access  Private (User, Librarian, Admin)
 */
router.get('/my', auth, roleCheck(['user', 'librarian', 'admin']), loanController.getMyLoans);

/**
 * @desc    Get all loans
 * @route   GET /api/loans/all
 * @access  Private (Librarian, Admin)
 */
router.get('/all', auth, roleCheck(['librarian', 'admin']), loanController.getAllLoans);

module.exports = router;