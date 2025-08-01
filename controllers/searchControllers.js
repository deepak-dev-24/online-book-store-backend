const Book = require('../models/Book');

const searchBooks = async (req, res)=>{
    try{
        const { keyword, category, min, max, sort } = req.query;
        let filter = {};
        if (keyword) {
            filter.$or = [
                { title: { $regex: keyword, $options: 'i' } },
                { author: { $regex: keyword, $options: 'i' } }
            ];
        }
         if (category) {
            filter.category = category;
        }
        if (min && max) {
            filter.price = { $gte: min, $lte: max };
        }   

        let sortOption = {};
        if (sort === 'price_asc') sortOption.price = 1;
        else if (sort === 'price_desc') sortOption.price = -1;

        const books = await Book.find(filter).sort(sortOption);

        res.status(200).json({ success: true, books });
    }
    catch(err){
        res.status(500).json({ success: false, message: err.message });
    }
};

module.exports = { searchBooks };