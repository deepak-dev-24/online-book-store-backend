const express = require('express');
const router = express.Router();
const {createBook,getAllBooks,getBookById,updateBook,deleteBook} = require('../controllers/bookController');
const {isAdmin, isAuthenticated} = require('../middlewares/authMiddleware');

router.post('/',isAuthenticated, isAdmin,createBook);
router.get('/', getAllBooks);
router.get('/:id', getBookById);
router.put('/:id',isAuthenticated,isAdmin,updateBook);
router.delete('/:id',isAuthenticated,isAdmin,deleteBook);

module.exports = router; 