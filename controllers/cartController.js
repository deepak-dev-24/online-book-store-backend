const Cart = require('../models/Cart');
const Book = require('../models/Book');

const calculateTotalPrice = async (cart) => {
  let total = 0;

  for (const item of cart.items) {
    const book = await Book.findById(item.book);

    if (book && typeof book.price === 'number') {
      total += book.price * item.quantity;
    }
  }

  cart.totalPrice = total; // Always a valid number (0 or more)
};

const addToCart = async (req, res) => {
  try {
    const userId = req.user.id;         // Step 1: Get logged-in user ID
    const { bookId } = req.params;      // Step 2: Get book ID from URL
    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      cart = new Cart({
        user: userId,
        items: [{ book: bookId, quantity: 1 }]
      });
    }
    else {
      const index = cart.items.findIndex(item => item.book.toString() === bookId);

      if (index > -1) {
        // Book is already in cart → increase quantity
        cart.items[index].quantity += 1;
      } else {
        // Book is not in cart → add new item
        cart.items.push({ book: bookId, quantity: 1 });
      }
    }
    await calculateTotalPrice(cart);
    await cart.save();

    res.status(200).json({
      success: true,
      message: 'Book added to cart successfully!',
      cart
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//getCart
const getCart = async (req, res) => {
  try {
    const userId = req.user.id;

    const cart = await Cart.findOne({ user: userId }).populate('items.book');

    if (!cart || cart.items.length === 0) {
      return res.status(200).json({
        success: true,
        message: "Your cart is empty.",
        items: [],
      });
    }

    res.status(200).json({
      success: true,
      cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong while fetching the cart.",
    });
  }
};

const updateCartItem = async (req, res) => {
  try {
    const userId = req.user.id;
    const { bookId } = req.params;
    const { quantity } = req.body; // Example: { "quantity": 3 }

    // 1. Find the user's cart
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ success: false, message: "Cart not found" });
    }

    // 2. Find the item inside cart
    const itemIndex = cart.items.findIndex(
      (item) => item.book.toString() === bookId
    );

    if (itemIndex === -1) {
      return res.status(404).json({ success: false, message: "Book not in cart" });
    }

    // 3. Update the quantity
    cart.items[itemIndex].quantity = quantity;

    // 4. Save and return
    await calculateTotalPrice(cart);
    await cart.save();

    res.status(200).json({
      success: true,
      message: "Cart item updated",
      cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

const removeCartItem = async (req, res) => {
  try {
    const userId = req.user.id;
    const { bookId } = req.params;

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ success: false, message: "Cart not found" });
    }

    // Remove the book from cart items
    const updatedItems = cart.items.filter(
      (item) => item.book.toString() !== bookId
    );

    cart.items = updatedItems;
    await calculateTotalPrice(cart);
    await cart.save();

    res.status(200).json({
      success: true,
      message: "Book removed from cart",
      cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to remove item",
    });
  }
};

const clearCart = async (req, res) => {
  try {
    const userId = req.user.id;

    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ success: false, message: "Cart not found" });
    }

    cart.items = [];
    cart.totalPrice = 0;  
    await cart.save();

    res.status(200).json({
      success: true,
      message: "Cart cleared successfully",
      cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong while clearing the cart",
    });
  }
};




module.exports = { addToCart, getCart, updateCartItem, removeCartItem, clearCart, calculateTotalPrice};



