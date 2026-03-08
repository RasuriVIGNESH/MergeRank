const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

const {
    updatePlatforms,
    syncPlatformData,
    getStudentStats,
    getAnalytics,
    getSuggestions,
    verifyPlatformUsername
} = require("../controllers/studentController");

// verify platform username
router.post("/verify", protect, verifyPlatformUsername);

// update usernames
router.put("/platforms", protect, updatePlatforms);

// sync platform data
router.post("/sync", protect, syncPlatformData);

// get student stats
router.get("/stats", protect, getStudentStats);

// analytics
router.get("/analytics", protect, getAnalytics);

// suggestions
router.get("/suggestions", protect, getSuggestions);

module.exports = router;