const express = require('express');
const router = express.Router();
const {isAuthenticated} = require('../middlewares/authMiddleware');
const {createOrder, getMyOrder} = require('../controllers/orderControllers');

router.post('/', isAuthenticated,createOrder);
router.get('/me', isAuthenticated, getMyOrder);


module.exports = router;
