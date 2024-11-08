const asyncHandler = require("express-async-handler");
const Doctor = require("../models/doctorDetailsModel");

// Register a new doctor
const registerDoctor = asyncHandler(async (req, res) => {
  const { name, email, specialty, phoneNumber, experience, address } = req.body;

  if (
    !name ||
    !email ||
    !specialty ||
    !phoneNumber ||
    !experience ||
    !address
  ) {
    res.status(400);
    throw new Error("Please provide all required fields");
  }

  // Check if doctor already exists
  const doctorExists = await Doctor.findOne({ email });
  if (doctorExists) {
    return res
      .status(400)
      .json({ message: "Doctor already exists with this email" });
  }

  // Create a new doctor instance
  const newDoctor = await Doctor.create({
    name,
    email,
    specialty,
    phoneNumber,
    experience,
    address,
  });

  res.status(201).json({
    message: "Doctor registered successfully",
    doctor: newDoctor,
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