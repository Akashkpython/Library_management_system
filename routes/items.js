const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const roleCheck = require('../middlewares/role');
const itemController = require('../controllers/itemController');

/**
 * @desc    Search items (must be before /:id)
 * @route   GET /api/items/search
 * @access  Private
 */
router.get('/search', auth, itemController.searchItems);

/**
 * @desc    Get all items
 * @route   GET /api/items
 * @access  Private
 */
router.get('/', auth, itemController.getItems);

/**
 * @desc    Get free books
 * @route   GET /api/items/free
 * @access  Private
 */
router.get('/free', auth, itemController.getFreeBooks);

/**
 * @desc    Get item by ID
 * @route   GET /api/items/:id
 * @access  Private
 */
router.get('/:id', auth, itemController.getItemById);

/**
 * @desc    Create new item
 * @route   POST /api/items
 * @access  Private (Librarian, Admin)
 */
router.post('/', auth, roleCheck(['librarian', 'admin']), itemController.createItem);

/**
 * @desc    Update item
 * @route   PUT /api/items/:id
 * @access  Private (Librarian, Admin)
 */
router.put('/:id', auth, roleCheck(['librarian', 'admin']), itemController.updateItem);

/**
 * @desc    Delete item
 * @route   DELETE /api/items/:id
 * @access  Private (Admin)
 */
router.delete('/:id', auth, roleCheck(['admin']), itemController.deleteItem);

/**
 * @desc    Update reading progress
 * @route   POST /api/items/:id/progress
 * @access  Private
 */
router.post('/:id/progress', auth, itemController.updateReadingProgress);

/**
 * @desc    Get reading progress
 * @route   GET /api/items/:id/progress
 * @access  Private
 */
router.get('/:id/progress', auth, itemController.getReadingProgress);

module.exports = router;