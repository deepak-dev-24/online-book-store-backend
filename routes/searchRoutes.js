const express = require('express');
const router = express.Router();
const { searchBooks } = require('../controllers/searchControllers');

router.get('/', searchBooks);

module.exports = router;