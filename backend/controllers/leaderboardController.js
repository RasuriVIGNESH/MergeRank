const User = require("../models/User");


// -----------------------------
// LeetCode Leaderboard
// -----------------------------
exports.getLeetcodeLeaderboard = async (req, res, next) => {
    try {

        const { branch, year } = req.query;

        let filter = {
            "platforms.leetcode.totalSolved": { $exists: true }
        };

        if (branch) filter.branch = branch;
        if (year) filter.gradYear = parseInt(year);

        const users = await User.find(filter)
            .sort({ "platforms.leetcode.totalSolved": -1 })
            .select("name branch gradYear platforms.leetcode");

        const leaderboard = users.map((user, index) => ({
            _id: user._id,
            rank: index + 1,
            name: user.name,
            branch: user.branch,
            gradYear: user.gradYear,
            solved: user.platforms.leetcode.totalSolved,
            easy: user.platforms.leetcode.easy,
            medium: user.platforms.leetcode.medium,
            hard: user.platforms.leetcode.hard
        }));

        res.json(leaderboard);

    } catch (error) {
        next(error);
    }
};


// -----------------------------
// Codeforces Leaderboard
// -----------------------------
exports.getCodeforcesLeaderboard = async (req, res, next) => {
    try {

        const { branch, year } = req.query;

        let filter = {
            "platforms.codeforces.rating": { $exists: true }
        };

        if (branch) filter.branch = branch;
        if (year) filter.gradYear = parseInt(year);

        const users = await User.find(filter)
            .sort({ "platforms.codeforces.rating": -1 })
            .select("name branch gradYear platforms.codeforces");

        const leaderboard = users.map((user, index) => ({
            _id: user._id,
            rank: index + 1,
            name: user.name,
            branch: user.branch,
            gradYear: user.gradYear,
            rating: user.platforms.codeforces.rating,
            maxRating: user.platforms.codeforces.maxRating
        }));

        res.json(leaderboard);

    } catch (error) {
        next(error);
    }
};


// -----------------------------
// CodeChef Leaderboard
// -----------------------------
exports.getCodechefLeaderboard = async (req, res, next) => {
    try {

        const { branch, year } = req.query;

        let filter = {
            "platforms.codechef.rating": { $exists: true }
        };

        if (branch) filter.branch = branch;
        if (year) filter.gradYear = parseInt(year);

        const users = await User.find(filter)
            .sort({ "platforms.codechef.rating": -1 })
            .select("name branch gradYear platforms.codechef");

        const leaderboard = users.map((user, index) => ({
            _id: user._id,
            rank: index + 1,
            name: user.name,
            branch: user.branch,
            gradYear: user.gradYear,
            rating: user.platforms.codechef.rating,
            stars: user.platforms.codechef.stars
        }));

        res.json(leaderboard);

    } catch (error) {
        next(error);
    }
};


// -----------------------------
// GitHub Leaderboard
// -----------------------------
exports.getGithubLeaderboard = async (req, res, next) => {
    try {

        const { branch, year } = req.query;

        let filter = {
            "platforms.github.totalContributions": { $exists: true }
        };

        if (branch) filter.branch = branch;
        if (year) filter.gradYear = parseInt(year);

        const users = await User.find(filter)
            .sort({ "platforms.github.totalContributions": -1 })
            .select("name branch gradYear platforms.github");

        const leaderboard = users.map((user, index) => ({
            _id: user._id,
            rank: index + 1,
            name: user.name,
            branch: user.branch,
            gradYear: user.gradYear,
            contributions: user.platforms.github.totalContributions || 0,
            followers: user.platforms.github.followers || 0,
            stars: user.platforms.github.totalStars || 0
        }));

        res.json(leaderboard);

    } catch (error) {
        next(error);
    }
};



// -----------------------------
// Overall MergeRank Leaderboard
// -----------------------------
exports.getOverallLeaderboard = async (req, res, next) => {
    try {

        const { branch, year } = req.query;

        let filter = { role: "student" };

        if (branch) filter.branch = branch;
        if (year) filter.gradYear = parseInt(year);

        const users = await User.find(filter).select(
            "name branch gradYear platforms"
        );

        let maxLeet = 0;
        let maxCF = 0;
        let maxGH = 0;
        let maxCC = 0;

        // find max values for normalization
        users.forEach(user => {

            const leet = user.platforms?.leetcode?.totalSolved || 0;
            const cf = user.platforms?.codeforces?.rating || 0;
            const gh = user.platforms?.github?.totalContributions || 0;
            const cc = user.platforms?.codechef?.rating || 0;

            maxLeet = Math.max(maxLeet, leet);
            maxCF = Math.max(maxCF, cf);
            maxGH = Math.max(maxGH, gh);
            maxCC = Math.max(maxCC, cc);
        });


        const leaderboard = users.map(user => {

            const leet = user.platforms?.leetcode?.totalSolved || 0;
            const cf = user.platforms?.codeforces?.rating || 0;
            const gh = user.platforms?.github?.totalContributions || 0;
            const cc = user.platforms?.codechef?.rating || 0;

            const normalizedLeet = maxLeet ? leet / maxLeet : 0;
            const normalizedCF = maxCF ? cf / maxCF : 0;
            const normalizedGH = maxGH ? gh / maxGH : 0;
            const normalizedCC = maxCC ? cc / maxCC : 0;

            const score =
                normalizedLeet * 0.4 +
                normalizedCF * 0.3 +
                normalizedGH * 0.2 +
                normalizedCC * 0.1;

            return {
                _id: user._id,
                name: user.name,
                branch: user.branch,
                gradYear: user.gradYear,
                leetcode: leet,
                codeforces: cf,
                github: gh,
                codechef: cc,
                mergeRankScore: Number(score.toFixed(4))
            };
        });

        leaderboard.sort((a, b) => b.mergeRankScore - a.mergeRankScore);

        const ranked = leaderboard.map((user, index) => ({
            rank: index + 1,
            ...user
        }));

        res.json(ranked);

    } catch (error) {
        next(error);
    }
};