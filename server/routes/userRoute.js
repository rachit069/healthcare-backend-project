// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const { registerUser, loginUser, getUserProfile, updateUserProfile } = require("../controllers/userController"); // Correct path to modules
const {validateJwtToken,} = require("../middlewares/jwtMiddleware");
// const {getUserProfile} = require("../controllers/userController")

// Register a new user
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/myaccount", validateJwtToken, getUserProfile);
router.patch("/myaccount", validateJwtToken, updateUserProfile);

module.exports = router;