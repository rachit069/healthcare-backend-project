const express = require("express");
const router = express.Router();
const { registerDoctor, getAllDoctors, getDoctorByEmail } = require("../controllers/doctorsDetailsController");
const jwtAuthMiddleware = require("../middlewares/jwtMiddleware");

router.post("/register", registerDoctor);
router.get("/", getAllDoctors)
router.get("/email/:email", getDoctorByEmail);
module.exports = router;
