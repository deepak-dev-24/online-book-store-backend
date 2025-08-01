const express = require("express");
const router = express.Router();

const { createReview } = require("../controllers/reviewController");
const { isAuthenticated } = require("../middlewares/authMiddleware");

// Route to create a review for a specific book
router.post("/:id/reviews", isAuthenticated, createReview);

module.exports = router;
