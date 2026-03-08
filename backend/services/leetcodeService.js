const axios = require("axios");

const getLeetCodeStats = async (username) => {
    try {

        const query = {
            query: `
        query getUserProfile($username: String!) {
          matchedUser(username: $username) {
            username
            submitStats {
              acSubmissionNum {
                difficulty
                count
              }
            }
          }
        }
      `,
            variables: { username }
        };

        const response = await axios.post(
            "https://leetcode.com/graphql",
            query
        );

        const data = response.data.data.matchedUser;

        if (!data) {
            throw new Error("LeetCode user not found");
        }

        const stats = data.submitStats.acSubmissionNum;

        let total = 0;
        let easy = 0;
        let medium = 0;
        let hard = 0;

        stats.forEach((item) => {
            if (item.difficulty === "All") total = item.count;
            if (item.difficulty === "Easy") easy = item.count;
            if (item.difficulty === "Medium") medium = item.count;
            if (item.difficulty === "Hard") hard = item.count;
        });

        return {
            username,
            totalSolved: total,
            easy,
            medium,
            hard
        };

    } catch (error) {
        console.error("LeetCode API error:", error.message);
        return null;
    }
};

module.exports = { getLeetCodeStats };