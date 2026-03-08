const axios = require("axios");

const getCodeforcesStats = async (handle) => {
    try {
        // user profile
        const infoRes = await axios.get(
            `https://codeforces.com/api/user.info?handles=${handle}`
        );

        const user = infoRes.data.result[0];

        // submissions (to count solved problems)
        const statusRes = await axios.get(
            `https://codeforces.com/api/user.status?handle=${handle}`
        );

        const submissions = statusRes.data.result;

        const solvedProblems = new Set();

        submissions.forEach((sub) => {
            if (sub.verdict === "OK") {
                solvedProblems.add(`${sub.problem.contestId}-${sub.problem.index}`);
            }
        });

        return {
            username: handle,
            rating: user.rating || 0,
            maxRating: user.maxRating || 0,
            rank: user.rank || "unrated",
            solved: solvedProblems.size
        };

    } catch (error) {
        console.error("Codeforces API error:", error.message);
        return null;
    }
};

module.exports = { getCodeforcesStats };