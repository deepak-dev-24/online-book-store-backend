const Review = require("../models/Review");
const Book = require("../models/Book");

const createReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const bookId = req.params.id;
    const userId = req.user._id;

    // 1. Check if book exists
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    // 2. Check if user already reviewed this book
    const existingReview = await Review.findOne({ user: userId, book: bookId });
    if (existingReview) {
      return res.status(400).json({ message: "You already reviewed this book" });
    }

    // 3. Create and save review
    const newReview = new Review({
      user: userId,
      book: bookId,
      name: req.user.name,
      rating: Number(rating),
      comment,
    });

    await newReview.save();

    // 4. Update Book's rating and numReviews
    const allReviews = await Review.find({ book: bookId });

    const avgRating =
      allReviews.reduce((acc, r) => acc + r.rating, 0) / allReviews.length;

    book.rating = avgRating;
    book.numReviews = allReviews.length;

    await book.save();

    res.status(201).json({ message: "Review added successfully" });
  } catch (err) {
    console.error("❌ Error in creating review:", err);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { createReview };
