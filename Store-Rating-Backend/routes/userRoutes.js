const express = require('express');
const router = express.Router();
const { addUser, getStats, getAllUsers } = require('../controllers/userController');
const auth = require('../middleware/authMiddleware');

// Only admin can access these routes
router.post('/add', auth(['admin']), addUser);
router.get('/stats', auth(['admin']), getStats);
router.get('/', auth(['admin']), getAllUsers);

module.exports = router;