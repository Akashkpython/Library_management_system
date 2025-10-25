const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const notificationController = require('../controllers/notificationController');

// Get my notifications
router.get('/', auth, notificationController.getNotifications);

// Mark as read
router.post('/read/:id', auth, notificationController.markAsRead);

module.exports = router;
