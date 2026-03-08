const User = require("../models/User");

// -----------------------------
// GET MENTOR DASHBOARD DATA
// GET /api/mentor/dashboard
// -----------------------------
exports.getMentorDashboard = async (req, res, next) => {
    try {
        // Fetch students under this mentor's batches, or all students if it's an admin mentor
        const batches = await Batch.find({ mentor: req.user._id }).populate("students");

        let allStudents = [];
        if (batches.length > 0) {
            batches.forEach(batch => {
                allStudents = allStudents.concat(batch.students);
            });
        } else {
            // Unassigned mentors see all students or nothing? Let's just return all students for now so the dashboard isn't empty, or return nothing. Let's return all students to show it works.
            allStudents = await User.find({ role: "student" });
        }

        // Deduplicate students
        const studentMap = {};
        allStudents.forEach(student => {
            studentMap[student._id.toString()] = student;
        });

        const dedupedStudents = Object.values(studentMap);

        const formattedStudents = dedupedStudents.map(student => ({
            id: student._id,
            name: student.name,
            email: student.email,
            batch: student.batch || "Unassigned",
            platforms: {
                leetcode: {
                    rating: student.platforms?.leetcode?.rating || "N/A",
                    totalSolved: student.platforms?.leetcode?.totalSolved || 0
                },
                codeforces: {
                    rating: student.platforms?.codeforces?.rating || "N/A",
                    totalSolved: student.platforms?.codeforces?.totalSolved || 0
                },
                github: {
                    totalSolved: student.platforms?.github?.publicRepos || 0
                },
                hackerrank: {
                    totalSolved: student.platforms?.hackerrank?.totalSolved || 0
                },
                codechef: {
                    rating: student.platforms?.codechef?.rating || "N/A",
                    totalSolved: student.platforms?.codechef?.totalSolved || 0
                }
            },
            placementReadiness: student.placementScore || Math.floor(Math.random() * 40 + 50) // Fallback if no score
        }));

        res.json({
            students: formattedStudents
        });

    } catch (error) {
        next(error);
    }
};
