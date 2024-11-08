// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const userController = require("../controllers/userController") // Correct path to modules
const jwtAuthMiddleware = require("../middlewares/jwtMiddleware");

// Register a new user
router.post("/register", userController.registerUser);
router.post("/login", jwtAuthMiddleware.generateJwtToken, userController.loginUser);
module.exports = router;''