const express = require("express");
const router = express.Router();

const {
    getLeetcodeLeaderboard,
    getCodeforcesLeaderboard,
    getCodechefLeaderboard,
    getGithubLeaderboard,
    getOverallLeaderboard
} = require("../controllers/leaderboardController");

router.get("/leetcode", getLeetcodeLeaderboard);

router.get("/codeforces", getCodeforcesLeaderboard);

router.get("/codechef", getCodechefLeaderboard);

router.get("/github", getGithubLeaderboard);

router.get("/overall", getOverallLeaderboard);

module.exports = router;