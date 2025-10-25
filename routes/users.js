// routes/users.js
const express = require('express');
const router = express.Router();
const { auth } = require('../middlewares/auth');
const { roleCheck } = require('../middlewares/role');
const { getMe, listUsers } = require('../controllers/userController');

router.get('/me', auth, getMe);
router.get('/', auth, roleCheck(['admin','librarian']), listUsers);

module.exports = router;
