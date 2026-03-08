const User = require("../models/User");

// -----------------------------
// GET MENTOR DASHBOARD DATA
// GET /api/mentor/dashboard
// -----------------------------
exports.getMentorDashboard = async (req, res, next) => {
    try {
        // Fetch all students for the dashboard
        const students = await User.find({ role: "student" });

        const formattedStudents = students.map(student => ({
            id: student._id,
            name: student.name,
            email: student.email,
            lastActive: student.lastActive || new Date().toISOString(),
            batch: student.branch && student.gradYear ? `${student.branch}-${student.gradYear}` : "Unassigned",
            platforms: {
                leetcode: {
                    rating: student.platforms?.leetcode?.rating || 0,
                    totalSolved: student.platforms?.leetcode?.totalSolved || 0
                },
                codeforces: {
                    rating: student.platforms?.codeforces?.rating || 0,
                    totalSolved: student.platforms?.codeforces?.totalSolved || 0
                },
                github: {
                    totalSolved: student.platforms?.github?.totalContributions || 0
                },
                hackerrank: {
                    totalSolved: student.platforms?.hackerrank?.totalSolved || 0
                },
                codechef: {
                    rating: student.platforms?.codechef?.rating || 0,
                    totalSolved: student.platforms?.codechef?.totalSolved || 0
                }
            },
            placementReadiness: student.placementScore || 0
        }));

        res.json({
            students: formattedStudents
        });

    } catch (error) {
        next(error);
    }
};
