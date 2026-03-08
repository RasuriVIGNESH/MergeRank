const User = require("../models/User");


// -----------------------------
// LeetCode Leaderboard
// -----------------------------
exports.getLeetcodeLeaderboard = async (req, res) => {
    try {

        const users = await User.find({
            "platforms.leetcode.totalSolved": { $exists: true }
        })
            .sort({ "platforms.leetcode.totalSolved": -1 })
            .select("name batch platforms placementScore activityScore consistencyScore");

        const leaderboard = users.map((user, index) => ({
            id: user._id,
            rank: index + 1,
            name: user.name,
            batch: user.batch,
            platforms: user.platforms,
            placementReadiness: user.placementScore || 0
        }));

        res.json(leaderboard);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



// -----------------------------
// Codeforces Leaderboard
// -----------------------------
exports.getCodeforcesLeaderboard = async (req, res) => {
    try {

        const users = await User.find({
            "platforms.codeforces.rating": { $exists: true }
        })
            .sort({ "platforms.codeforces.rating": -1 })
            .select("name batch platforms.codeforces");

        const leaderboard = users.map((user, index) => ({
            rank: index + 1,
            name: user.name,
            batch: user.batch,
            rating: user.platforms.codeforces.rating,
            maxRating: user.platforms.codeforces.maxRating,
            solved: user.platforms.codeforces.solved
        }));

        res.json(leaderboard);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



// -----------------------------
// CodeChef Leaderboard
// -----------------------------
exports.getCodechefLeaderboard = async (req, res) => {
    try {

        const users = await User.find({
            "platforms.codechef.rating": { $exists: true }
        })
            .sort({ "platforms.codechef.rating": -1 })
            .select("name batch platforms.codechef");

        const leaderboard = users.map((user, index) => ({
            rank: index + 1,
            name: user.name,
            batch: user.batch,
            rating: user.platforms.codechef.rating,
            stars: user.platforms.codechef.stars,
            globalRank: user.platforms.codechef.globalRank
        }));

        res.json(leaderboard);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



// -----------------------------
// GitHub Leaderboard
// -----------------------------
exports.getGithubLeaderboard = async (req, res) => {
    try {

        const users = await User.find({
            "platforms.github.totalContributions": { $exists: true }
        })
            .sort({ "platforms.github.totalContributions": -1 })
            .select("name batch platforms.github");

        const leaderboard = users.map((user, index) => ({
            rank: index + 1,
            name: user.name,
            batch: user.batch,
            totalContributions: user.platforms.github.totalContributions || 0,
            followers: user.platforms.github.followers || 0,
            totalStars: user.platforms.github.totalStars || 0
        }));

        res.json(leaderboard);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};