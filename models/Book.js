const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  excerpt: {
    type: String,
    required: true,
  },
  ISBN: {
    type: String,
    required: true,
    unique: true,
  },
  category: {
    type: String,
    required: true,
  },
  subcategory: {
    type: [String],
    required: true,
  },

  rating: {
  type: Number,
  default: 0,
  },
  numReviews: {
    type: Number,
    default: 0,
  },
   
  deletedAt: {
    type: Date,
    default: "",
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  releasedAt: {
    type: Date,
    required: true,
  },
  image: {
    type: String,
    default: "",
  },
  price: {
    type: Number,
    required: true,
  }


}, { timestamps: true });

module.exports = mongoose.model('Book', bookSchema);


