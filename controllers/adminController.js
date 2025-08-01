const User = require("../models/User");
const Book = require("../models/Book");
const Order = require("../models/Order");

const getAdminStats = async (req, res) => {
  try {
    const users = await User.countDocuments();
    const books = await Book.countDocuments();
    const orders = await Order.find();

    const totalRevenue = orders.reduce((sum, order) => sum + (order.totalPrice || 0), 0);

    res.status(200).json({
      success: true,
      users,
      books,
      orders: orders.length,
      totalRevenue,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .populate("items.book", "title price");

    res.status(200).json({
      success: true,
      totalOrders: orders.length,
      orders: orders.map(order => ({
        id: order._id,
        user: order.user,
        items: order.items.map(item => ({
          bookTitle: item.book?.title || 'Deleted Book',
          price: item.book?.price || 0,
          quantity: item.quantity
        })),
        totalAmount: order.totalPrice,
        address: order.address,
        createdAt: order.createdAt
      }))
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getAllOrders,
  getAdminStats,
};
