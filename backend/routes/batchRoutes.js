const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const { protect, authorize } = require("../middleware/authMiddleware");

const {
    createBatch,
    getBatches,
    getBatchById,
    addStudent,
    removeStudent
} = require("../controllers/batchController");

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    next();
};

router.post(
    "/",
    protect, authorize("mentor"),
    [
        body("name").trim().notEmpty().withMessage("Batch name is required"),
        body("college").trim().notEmpty().withMessage("College is required"),
        body("year").trim().notEmpty().withMessage("Year is required")
    ],
    validate,
    createBatch
);

router.get("/", protect, authorize("mentor"), getBatches);
router.get("/:id", protect, authorize("mentor"), getBatchById);

router.post(
    "/add-student",
    protect, authorize("mentor"),
    [
        body("batchId").notEmpty().withMessage("batchId is required"),
        body("userId").notEmpty().withMessage("userId is required")
    ],
    validate,
    addStudent
);

router.delete(
    "/remove-student",
    protect, authorize("mentor"),
    [
        body("batchId").notEmpty().withMessage("batchId is required"),
        body("userId").notEmpty().withMessage("userId is required")
    ],
    validate,
    removeStudent
);

module.exports = router;

