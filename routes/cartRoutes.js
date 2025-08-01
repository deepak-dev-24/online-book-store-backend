const express = require('express');
const router = express.Router();
const { addToCart,getCart,updateCartItem,removeCartItem,clearCart } = require('../controllers/cartController');
const { isAuthenticated } = require('../middlewares/authMiddleware');

router.post('/:bookId', isAuthenticated, addToCart);
router.get('/', isAuthenticated, getCart);
router.put('/:bookId', isAuthenticated, updateCartItem);
router.delete('/:bookId', isAuthenticated, removeCartItem);
router.delete('/', isAuthenticated, clearCart);


module.exports = router;
