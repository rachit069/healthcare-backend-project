const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
// const {generateJwtToken} = require("../middlewares/jwtMiddleware");
require("dotenv").config();
const generateJwtToken = (user) => {
  return jwt.sign(user, process.env.PRIVATE_KEY, { expiresIn: 400000 });
};

const registerUser = asyncHandler(async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
    phoneNumber,
    age,
    bloodGroup,
    gender,
  } = req.body;

  // Check if all fields are provided
  if (
    !firstName ||
    !lastName ||
    !email ||
    !password ||
    !phoneNumber ||
    !age ||
    !bloodGroup ||
    !gender
  ) {
    res.status(400);
    throw new Error("Please provide all required fields");
  }

  // Check if user already exists
  const userExist = await User.findOne({ email });
  if (userExist) {
    return res.status(400).json({ message: "User already exists" });
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create the user
  const newUser = await User.create({
    firstName,
    lastName,
    email,
    phoneNumber,
    age,
    bloodGroup,
    gender,
    password: hashedPassword,
  });
  console.log("New User:", newUser);

  // Send success response
  res
    .status(201)
    .json({ message: "User registered successfully", user: newUser, token });
});

// const myAccount = asyncHandler(async ( req, res)=>{

// })

// Static Login
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("please fill all fields");
  }
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    return res.status(400).json({ message: "password did not match" });
  }

  const token = generateJwtToken({
    id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phoneNumber: user.phoneNumber,
    bloodGroup: user.bloodGroup,
    age: user.age,
    gender: user.gender,
  });
  console.log(token)
  res.status(200).json({ message: "Login successfully", token: token });
});

const getUserProfile = asyncHandler(async (req, res) => {
  try {
    const {email} = req.body;
    const data = await User.findOne({ email });
    if (!data) {
      return res.status(401).json({ message: "User not found" });
    }
    return res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ err });
  }
});

const updateUserProfile = asyncHandler(async (req, res) => {
  try{
    const {firstName, lastName, email, phoneNumber, age, bloodGroup, gender, password} = req.body;

    const user = await User.findOne({ email });
    if(!user){
      return res.status(401).json({ message: "User not found" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    if (firstName) user.firstName = firstName;
    if(lastName) user.lastName = lastName;
    if(email) user.email = email;
    if(phoneNumber) user.phoneNumber = phoneNumber;
    if(age) user.age = age;
    if(bloodGroup) user.bloodGroup = bloodGroup;
    if(gender) user.gender = gender;
    if(password) user.password = hashedPassword

    const updatedUser = await user.save();

    return res.status(200).json(updatedUser);
  }
  catch(err){
    res.status(500).json({err});
  }
});

module.exports = { registerUser, loginUser, getUserProfile, updateUserProfile };
