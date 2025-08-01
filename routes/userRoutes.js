const express = require('express');
const router = express.Router();

const {getUserProfile,updateUserProfile} = require('../controllers/userController')
const {isAuthenticated} = require('../middlewares/authMiddleware');

router.get('/profile', isAuthenticated, getUserProfile);
router.put('/profile', isAuthenticated, updateUserProfile);

module.exports = router;