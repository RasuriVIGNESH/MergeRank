const express = require("express");
const router = express.Router();
const { protect, authorize } = require("../middleware/authMiddleware");

const { getMentorDashboard } = require("../controllers/mentorController");

router.get("/dashboard", protect, authorize("mentor"), getMentorDashboard);

module.exports = router;
