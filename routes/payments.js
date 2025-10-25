const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const roleCheck = require('../middlewares/role');

// Get all fines → only admin/librarian
router.get('/fines', auth, roleCheck(['librarian', 'admin']), (req, res) => {
  // Placeholder: fetch fines from DB
  res.json([{ userId: '123', amount: 50 }]);
});

module.exports = router;
