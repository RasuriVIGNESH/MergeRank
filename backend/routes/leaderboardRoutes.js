const express = require("express");
const router = express.Router();

const {
    getLeetcodeLeaderboard,
    getCodeforcesLeaderboard,
    getCodechefLeaderboard,
    getGithubLeaderboard
} = require("../controllers/leaderboardController");

router.get("/leetcode", getLeetcodeLeaderboard);

router.get("/codeforces", getCodeforcesLeaderboard);

router.get("/codechef", getCodechefLeaderboard);

router.get("/github", getGithubLeaderboard);

module.exports = router;