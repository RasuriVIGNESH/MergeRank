const User = require("../models/User");

const { getLeetCodeStats } = require("../services/leetcodeService");
const { getGithubStats } = require("../services/githubService");
const { getCodeforcesStats } = require("../services/codeforcesService");
const { getCodechefStats } = require("../services/codechefService");
const { getHackerrankStats } = require("../services/hackerrankService");


// -----------------------------
// VERIFY PLATFORM USERNAME
// -----------------------------
// POST /api/student/verify
exports.verifyPlatformUsername = async (req, res) => {
    try {
        const { platform, username } = req.body;
        if (!platform || !username) {
            return res.status(400).json({ isValid: false, message: "Platform and username are required." });
        }

        let data = null;
        if (platform === 'leetcode') {
            data = await getLeetCodeStats(username);
        } else if (platform === 'github') {
            data = await getGithubStats(username);
        } else if (platform === 'codeforces') {
            data = await getCodeforcesStats(username);
        } else if (platform === 'codechef') {
            data = await getCodechefStats(username);
        } else if (platform === 'hackerrank') {
            data = await getHackerrankStats(username);
        } else {
            return res.status(400).json({ isValid: false, message: "Invalid platform." });
        }

        if (data) {
            res.json({ isValid: true, message: "Username verified successfully!" });
        } else {
            res.json({ isValid: false, message: "User not found or invalid username." });
        }
    } catch (error) {
        res.status(500).json({ isValid: false, message: error.message });
    }
};

// -----------------------------
// UPDATE PLATFORM USERNAMES
// -----------------------------
// PUT /api/student/platforms
exports.updatePlatforms = async (req, res) => {
    try {

        const { leetcode, github, codeforces, codechef, hackerrank } = req.body;

        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.platforms.leetcode = { username: leetcode };
        user.platforms.github = { username: github };
        user.platforms.codeforces = { username: codeforces };
        user.platforms.codechef = { username: codechef };
        user.platforms.hackerrank = { username: hackerrank };

        await user.save();

        res.json({
            message: "Platforms updated successfully",
            platforms: user.platforms
        });

    } catch (error) {
        next(error);
    }
};


// -----------------------------
// SYNC PLATFORM DATA
// -----------------------------
// POST /api/student/sync
exports.syncPlatformData = async (req, res) => {
    try {

        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const leetcodeUsername = user.platforms.leetcode?.username;
        const githubUsername = user.platforms.github?.username;
        const codeforcesHandle = user.platforms.codeforces?.username;
        const codechefUsername = user.platforms.codechef?.username;
        const hackerrankUsername = user.platforms.hackerrank?.username;

        const promises = [
            leetcodeUsername ? getLeetCodeStats(leetcodeUsername) : Promise.resolve(null),
            githubUsername ? getGithubStats(githubUsername) : Promise.resolve(null),
            codeforcesHandle ? getCodeforcesStats(codeforcesHandle) : Promise.resolve(null),
            codechefUsername ? getCodechefStats(codechefUsername) : Promise.resolve(null),
            hackerrankUsername ? getHackerrankStats(hackerrankUsername) : Promise.resolve(null)
        ];

        const [
            leetcodeStats,
            githubStats,
            codeforcesStats,
            codechefStats,
            hackerrankStats
        ] = await Promise.all(promises);


        // -----------------------------
        // SAVE STATS IN DATABASE
        // -----------------------------

        if (leetcodeStats) {
            user.platforms.leetcode = {
                ...user.platforms.leetcode,
                ...leetcodeStats,
                lastSynced: new Date()
            };
        }

        if (githubStats) {
            user.platforms.github = {
                ...user.platforms.github,
                ...githubStats,
                lastSynced: new Date()
            };
        }

        if (codeforcesStats) {
            user.platforms.codeforces = {
                ...user.platforms.codeforces,
                ...codeforcesStats,
                lastSynced: new Date()
            };
        }
        if (hackerrankStats) {
            user.platforms.hackerrank = {
                ...user.platforms.hackerrank,
                ...hackerrankStats,
                lastSynced: new Date()
            };
        }

        if (codechefStats) {
            user.platforms.codechef = {
                ...user.platforms.codechef,
                ...codechefStats,
                lastSynced: new Date()
            };
        }

        await user.save();


        // -----------------------------
        // RESPONSE
        // -----------------------------

        res.json({
            message: "Sync completed",
            leetcode: leetcodeStats,
            github: githubStats,
            codeforces: codeforcesStats,
            codechef: codechefStats,
            hackerrank: hackerrankStats
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// -----------------------------
// GET STUDENT STATS
// -----------------------------
// GET /api/student/stats
exports.getStudentStats = async (req, res) => {
    try {
        const studentId = req.params.id || req.user._id;

        const user = await User.findById(studentId).select("platforms name email branch gradYear batch aiSuggestions placementScore activityScore consistencyScore");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({
            id: user._id,
            name: user.name,
            email: user.email,
            branch: user.branch,
            gradYear: user.gradYear,
            batch: user.batch,
            platforms: user.platforms,
            aiSuggestions: user.aiSuggestions || [],
            placementReadiness: user.placementScore || 0,
            activityScore: user.activityScore || 0,
            consistencyScore: user.consistencyScore || 0
        });

    } catch (error) {
        next(error);
    }
};


// -----------------------------
// ANALYTICS
// GET /api/student/analytics
// -----------------------------
exports.getAnalytics = async (req, res, next) => {
    try {

        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const lc = user.platforms.leetcode || {};
        const cf = user.platforms.codeforces || {};
        const gh = user.platforms.github || {};
        const cc = user.platforms.codechef || {};
        const hr = user.platforms.hackerrank || {};

        // Difficulty distribution (LeetCode)
        const difficultyDistribution = {
            easy: lc.easy || 0,
            medium: lc.medium || 0,
            hard: lc.hard || 0
        };

        // Total solved across platforms
        const totalSolved = (lc.totalSolved || 0) + (cf.solved || 0);

        // Which platforms are active (have a username + lastSynced)
        const platformActivity = {
            leetcode: !!(lc.username && lc.lastSynced),
            github: !!(gh.username && gh.lastSynced),
            codeforces: !!(cf.username && cf.lastSynced),
            codechef: !!(cc.username && cc.lastSynced),
            hackerrank: !!(hr.username && hr.lastSynced)
        };

        // Activity score: each active platform = 20 points (max 100)
        const activePlatforms = Object.values(platformActivity).filter(Boolean).length;
        const activityScore = activePlatforms * 20;

        // Consistency score: platforms synced within last 7 days
        const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
        const platforms = [lc, gh, cf, cc, hr];
        const recentlySynced = platforms.filter(
            (p) => p.lastSynced && new Date(p.lastSynced) >= sevenDaysAgo
        ).length;
        const consistencyScore = Math.round((recentlySynced / 5) * 100);

        // Persist scores to user document
        user.activityScore = activityScore;
        user.consistencyScore = consistencyScore;
        await user.save();

        res.json({
            difficultyDistribution,
            totalSolved,
            platformActivity,
            activityScore,
            consistencyScore,
            leetcode: {
                arrays: lc.arrays || 0,
                strings: lc.strings || 0,
                dp: lc.dp || 0,
                graphs: lc.graphs || 0,
                trees: lc.trees || 0
            },
            github: {
                totalContributions: gh.totalContributions || 0
            }
        });

    } catch (error) {
        next(error);
    }
};


// -----------------------------
// SUGGESTIONS
// GET /api/student/suggestions
// -----------------------------
exports.getSuggestions = async (req, res, next) => {
    try {

        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const lc = user.platforms.leetcode || {};
        const cf = user.platforms.codeforces || {};
        const cc = user.platforms.codechef || {};
        const hr = user.platforms.hackerrank || {};

        const suggestions = [];

        const easy = lc.easy || 0;
        const medium = lc.medium || 0;
        const hard = lc.hard || 0;
        const totalSolved = (lc.totalSolved || 0);

        // Rule: low medium problems
        if (totalSolved > 0 && medium < 20) {
            suggestions.push({
                type: "difficulty",
                message: "Practice more medium-difficulty problems to strengthen interview readiness."
            });
        }

        // Rule: low hard problems
        if (totalSolved > 30 && hard < 5) {
            suggestions.push({
                type: "difficulty",
                message: "Start attempting hard problems to challenge yourself and improve placement readiness."
            });
        }

        // Rule: mostly easy problems
        if (totalSolved > 10 && easy / totalSolved > 0.75) {
            suggestions.push({
                type: "difficulty",
                message: "You're solving mostly easy problems. Push yourself with medium and hard challenges."
            });
        }

        // Rule: no Codeforces
        if (!cf.username) {
            suggestions.push({
                type: "platform",
                message: "Register on Codeforces and participate in rated contests to boost your competitive programming profile."
            });
        }

        // Rule: no CodeChef
        if (!cc.username) {
            suggestions.push({
                type: "platform",
                message: "Set up your CodeChef profile and participate in monthly challenges to earn ratings and stars."
            });
        }

        // Rule: no HackerRank
        if (!hr.username) {
            suggestions.push({
                type: "platform",
                message: "Complete HackerRank skill certifications to add verified credentials to your profile."
            });
        }

        // Rule: low activity
        const activePlatforms = [
            user.platforms.leetcode,
            user.platforms.github,
            user.platforms.codeforces,
            user.platforms.codechef,
            user.platforms.hackerrank
        ].filter((p) => p && p.username && p.lastSynced).length;

        if (activePlatforms < 3) {
            suggestions.push({
                type: "activity",
                message: "Sync at least 3 platforms to get a comprehensive view of your coding activity."
            });
        }

        // Persist suggestions to user document
        user.aiSuggestions = suggestions.map((s) => ({
            topic: s.type,
            problems: [s.message],
            generatedAt: new Date()
        }));
        await user.save();

        res.json({ suggestions: user.aiSuggestions });

    } catch (error) {
        next(error);
    }
};
