const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const roleCheck = require('../middlewares/role');
const User = require('../models/User');
const Item = require('../models/Item');

// Admin dashboard stats
router.get('/dashboard', auth, roleCheck(['admin']), async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalItems = await Item.countDocuments();
    res.json({ totalUsers, totalItems });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Manage all users (view only)
router.get('/users', auth, roleCheck(['admin']), async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
