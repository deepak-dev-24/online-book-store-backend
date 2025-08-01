const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../middlewares/authMiddleware');
const { addToWishlist, removeFromWishlist, getWishlist } = require('../controllers/wishlistController');

router.post('/add', isAuthenticated, addToWishlist);
router.delete('/remove/:bookId', isAuthenticated, removeFromWishlist);
router.get('/', isAuthenticated, getWishlist);

module.exports = router;
