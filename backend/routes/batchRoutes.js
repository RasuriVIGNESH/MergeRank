const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

const {
    getBatches,
    getBatchStudents
} = require("../controllers/batchController");


// list all batches
router.get("/", protect, getBatches);

// get students in a batch
router.get("/:branch/:year", protect, getBatchStudents);

module.exports = router;