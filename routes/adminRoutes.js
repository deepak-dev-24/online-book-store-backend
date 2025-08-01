const express = require("express");
const router = express.Router();
const { getAllOrders, getAdminStats } = require("../controllers/adminController");
const { isAuthenticated, isAdmin } = require("../middlewares/authMiddleware");

router.get("/orders", isAuthenticated, isAdmin, getAllOrders);

router.get("/stats", isAuthenticated,  getAdminStats);

module.exports = router;
