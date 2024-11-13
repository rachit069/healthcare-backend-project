const express = require("express");
const router = express.Router();
const {
  registerDoctor,
  getAllDoctors,
  getDoctorByEmail
} = require("../controllers/doctorsDetailsController");
const jwtAuthMiddleware = require("../middlewares/jwtMiddleware");

router.post("/register", registerDoctor);
router.get("/", jwtAuthMiddleware.validateJwtToken, getAllDoctors);
router.get("/email/:email",jwtAuthMiddleware.validateJwtToken, getDoctorByEmail);
// router.post("/login", jwtAuthMiddleware.generateJwtToken, loginDoctor);

module.exports = router;
