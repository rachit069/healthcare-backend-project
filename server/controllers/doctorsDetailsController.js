const asyncHandler = require("express-async-handler");
const Doctor = require("../models/doctorDetailsModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { generateJwtToken } = require("../middlewares/jwtMiddleware");
// Register a new doctor
// const generateJwtToken = (doctorData) => {
//   jwt.sign(doctorData, process.env.PRIVATE_KEY, { expiresIn: "1h" });
// };
const registerDoctor = asyncHandler(async (req, res) => {
  const { name, email, specialty, phoneNumber, experience, address } = req.body;

  // Check for missing fields
  if (
    !name ||
    !email ||
    !specialty ||
    !phoneNumber ||
    !experience ||
    !address
  ) {
    res.status(400);
    throw new Error("Please fill all fields");
  }

  // Check if the doctor already exists
  const doctorExists = await Doctor.findOne({ email });
  if (doctorExists) {
    return res.status(400).json({ message: "Doctor already exists" });
  }

  // Create a new doctor
  const newDoctor = await Doctor.create({
    name,
    email,
    specialty,
    phoneNumber,
    experience,
    address,
  });

  const token = generateJwtToken({
    id: newDoctor._id,
    name: newDoctor.name,
    email: newDoctor.email,
    specialty: newDoctor.specialty,
    phoneNumber: newDoctor.phoneNumber,
    experience: newDoctor.experience,
    address: newDoctor.address,
  });

  // Respond with success message and the created doctor
  res.status(201).json({
    message: "Doctor registered successfully",
    doctor: newDoctor,
    token,
  });
});

const getAllDoctors = asyncHandler(async (req, res) => {
  const doctors = await Doctor.find({});
  res.status(200).json(doctors);
});

const getDoctorByEmail = asyncHandler(async (req, res) => {
  const doctor = await Doctor.findOne({ email: req.params.email });
  if (!doctor) {
    res.status(404);
    throw new Error("Doctor not found");
  }
  res.status(200).json(doctor);
});

module.exports = { registerDoctor, getAllDoctors, getDoctorByEmail };
