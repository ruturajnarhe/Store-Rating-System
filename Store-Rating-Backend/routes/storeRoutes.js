const express = require('express');
const router = express.Router();
const { getAllStores, submitRating } = require('../controllers/storeController');
const auth = require('../middleware/authMiddleware');

router.get('/', auth(['normal', 'admin', 'owner']), getAllStores);
router.post('/rate', auth(['normal']), submitRating);

module.exports = router;