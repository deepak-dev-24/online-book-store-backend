const Book = require('../models/Book');
//createBook

const createBook = async (req, res)=>{
    try{
        const { title, excerpt, ISBN, category, subcategory, releasedAt, image, price } = req.body;
        if(!title || !excerpt || !ISBN || !category || !subcategory || !releasedAt || !price){
            return res.status(400).json({message: 'all fields are required..'});
        }
        const existingBook = await Book.findOne({ISBN});    
        if(existingBook){
            return res.status(400).json({message: 'Book with same ISBN already exists'});
        }

        const book = await Book.create({
            title,
            excerpt,
            ISBN,
            category,
            subcategory,
            releasedAt,
            image,
            price
        });

        res.status(201).json({
            success: true,
            message: "Book created successfully",
            data: book
        });
    }
    catch(error){
        res.status(500).json({message: 'Server error'});
    }
}
//getAllBooks

const getAllBooks = async (req,res)=>{
    try{
        const books = await Book.find({isDeleted: false});
        res.status(200).json({
            success: true,
            count: books.length,
            date: books
        });
    }
    catch(error){
        res.status(500).json({message:'Server error'});
    }
};

//getBookById

const getBookById = async (req, res)=>{
    try{
        const bookId = req.params.id;
        const book = await Book.findOne({_id: bookId, isDeleted: false});
        if(!book){
            return res.status(404).json({message: 'Book not found'});
        }
        res.status(202).json({
            success: true,
            data: book
        });
    }
    catch(error){
        res.status(500).json({message: 'Server Error'});
    }
}
//updateBook

const updateBook = async (req, res)=>{
    try{
        const bookId = req.params.id;
        const updateDate = req.body;
        const book = await Book.findOne({_id: bookId, isDeleted: false});
        if(!book){
            return res.status(404).json({message: 'Book not found'});
        }

        const updatedBook = await Book.findByIdAndUpdate(bookId,updateDate,{
            new: true,
            runValidators: true
        });

        res.status(200).json({
            success: true,
            message: 'Book updated Successfully',
            data: updatedBook
        })
    }
    catch(error){
        res.status(500).json({Message: 'Server Error'});
    }
}

//deleteBook

const deleteBook = async (req, res)=>{
    try{
        const bookId = req.params.id;
        const book = await Book.findOne({_id: bookId, isDeleted: false});
        if(!book){
            return res.status(404).json({message: 'Book not found or already deleted'});
        }
        book.isDeleted= true;
        book.deletedAt = new Date();

        await book.save();

        res.status(200).json({
            success: true,
            message: 'Book deleted successfully'
        });
    }
    catch(error){
        res.status(500).json({Message: 'Server Error'});
    }
};
module.exports = {
    createBook,
    getAllBooks,
    getBookById,
    updateBook,
    deleteBook,
};