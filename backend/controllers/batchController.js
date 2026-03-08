const User = require("../models/User");


// -----------------------------
// GET ALL BATCHES
// GET /api/batches
// -----------------------------
exports.getBatches = async (req, res, next) => {
    try {

        const batches = await User.aggregate([
            {
                $match: { role: "student" }
            },
            {
                $group: {
                    _id: {
                        college: "$college",
                        branch: "$branch",
                        gradYear: "$gradYear"
                    },
                    studentCount: { $sum: 1 }
                }
            },
            {
                $project: {
                    _id: 0,
                    college: "$_id.college",
                    branch: "$_id.branch",
                    gradYear: "$_id.gradYear",
                    studentCount: 1
                }
            },
            {
                $sort: { gradYear: 1 }
            }
        ]);

        res.json(batches);

    } catch (error) {
        next(error);
    }
};



// -----------------------------
// GET STUDENTS IN A BATCH
// GET /api/batches/:branch/:year
// -----------------------------
exports.getBatchStudents = async (req, res, next) => {
    try {

        const { branch, year } = req.params;

        const students = await User.find({
            role: "student",
            branch,
            gradYear: parseInt(year)
        }).select(
            "name email branch gradYear platforms.leetcode.totalSolved platforms.codeforces.rating activityScore consistencyScore"
        );

        res.json({
            branch,
            year,
            count: students.length,
            students
        });

    } catch (error) {
        next(error);
    }
};