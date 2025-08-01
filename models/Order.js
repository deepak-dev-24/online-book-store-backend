const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true,
    },

    items: [
        {
            book:{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Book',
                require: true,
            },
            quantity: {
                type: Number,
                require: true,
                min: 1,
            },
        }
    ],
      shippingInfo: {
        name: { type: String, required: true },
        phone: { type: String, required: true },
        address: { type: String, required: true },
        pincode: { type: String, required: true },
    },
      paymentMethod: {
        type: String,
        enum: ['COD', 'UPI', 'Card'],
        default: 'COD',
    },  
      totalPrice: {
        type: Number,
        required: true,
    },

  status: {
        type: String,
        enum: ['pending', 'shipped', 'delivered'],
        default: 'pending',
    },

}, { timestamps: true }); // Adds createdAt and updatedAt

module.exports = mongoose.model('Order', orderSchema);
