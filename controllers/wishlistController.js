const Wishlist = require('../models/Wishlist');

const addToWishlist = async (req, res) => {
  const { bookId } = req.body;
  const userId = req.user._id;

  try {
    // Check if already added
    const alreadyInWishlist = await Wishlist.findOne({ user: userId, book: bookId });
    if (alreadyInWishlist) {
      return res.status(400).json({ message: 'Book already in wishlist' });
    }

    const wishlistItem = await Wishlist.create({ user: userId, book: bookId });
    res.status(201).json({ success: true, message: 'Added to wishlist', wishlistItem });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error });
  }
};

const removeFromWishlist = async (req, res) => {
  const bookId = req.params.bookId;
  const userId = req.user._id;

  try {
    const deleted = await Wishlist.findOneAndDelete({ user: userId, book: bookId });

    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Item not found in wishlist' });
    }

    res.json({ success: true, message: 'Removed from wishlist' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error });
  }
};

const getWishlist = async (req, res) => {
  const userId = req.user._id;

  try {
    const wishlist = await Wishlist.find({ user: userId }).populate('book');
    res.json({ success: true, wishlist });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error });
  }
};

module.exports = {
  addToWishlist,
  removeFromWishlist,
  getWishlist,
};