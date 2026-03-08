const Batch = require("../models/Batch");
const User = require("../models/User");

// -----------------------------
// CREATE BATCH
// POST /api/batches
// -----------------------------
exports.createBatch = async (req, res, next) => {
    try {
        const { name, college, year, mentor } = req.body;

        const batch = await Batch.create({ name, college, year, mentor });

        res.status(201).json({ message: "Batch created successfully", batch });

    } catch (error) {
        next(error);
    }
};


// -----------------------------
// GET ALL BATCHES
// GET /api/batches
// -----------------------------
exports.getBatches = async (req, res, next) => {
    try {
        const batches = await Batch.find()
            .populate("mentor", "name email")
            .populate("students", "name email batch");

        res.json(batches);

    } catch (error) {
        next(error);
    }
};


// -----------------------------
// GET BATCH BY ID
// GET /api/batches/:id
// -----------------------------
exports.getBatchById = async (req, res, next) => {
    try {
        const batch = await Batch.findById(req.params.id)
            .populate("mentor", "name email role")
            .populate("students", "name email batch platforms.leetcode.totalSolved platforms.codeforces.rating");

        if (!batch) {
            return res.status(404).json({ message: "Batch not found" });
        }

        res.json(batch);

    } catch (error) {
        next(error);
    }
};


// -----------------------------
// ADD STUDENT TO BATCH
// POST /api/batches/add-student
// -----------------------------
exports.addStudent = async (req, res, next) => {
    try {
        const { batchId, userId } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // $addToSet prevents duplicates automatically
        const batch = await Batch.findByIdAndUpdate(
            batchId,
            { $addToSet: { students: userId } },
            { new: true }
        ).populate("students", "name email batch");

        if (!batch) {
            return res.status(404).json({ message: "Batch not found" });
        }

        res.json({ message: "Student added to batch", batch });

    } catch (error) {
        next(error);
    }
};


// -----------------------------
// REMOVE STUDENT FROM BATCH
// DELETE /api/batches/remove-student
// -----------------------------
exports.removeStudent = async (req, res, next) => {
    try {
        const { batchId, userId } = req.body;

        const batch = await Batch.findByIdAndUpdate(
            batchId,
            { $pull: { students: userId } },
            { new: true }
        ).populate("students", "name email batch");

        if (!batch) {
            return res.status(404).json({ message: "Batch not found" });
        }

        res.json({ message: "Student removed from batch", batch });

    } catch (error) {
        next(error);
    }
};
