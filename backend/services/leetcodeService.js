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
            tagProblemCounts {
              advanced {
                tagName
                problemsSolved
              }
              intermediate {
                tagName
                problemsSolved
              }
              fundamental {
                tagName
                problemsSolved
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

    let arrays = 0;
    let strings = 0;
    let dp = 0;
    let graphs = 0;
    let trees = 0;

    const tagGroups = data.tagProblemCounts;
    if (tagGroups) {
      const allTags = [
        ...(tagGroups.advanced || []),
        ...(tagGroups.intermediate || []),
        ...(tagGroups.fundamental || [])
      ];

      allTags.forEach(tag => {
        const name = tag.tagName.toLowerCase();
        const count = tag.problemsSolved;
        if (name === 'array') arrays += count;
        else if (name === 'string') strings += count;
        else if (name === 'dynamic programming') dp += count;
        else if (name === 'graph theory') graphs += count;
        else if (name === 'tree') trees += count;
      });
    }

    return {
      username,
      totalSolved: total,
      easy,
      medium,
      hard,
      arrays,
      strings,
      dp,
      graphs,
      trees
    };

  } catch (error) {
    console.error("LeetCode API error:", error.message);
    return null;
  }
};

module.exports = { getLeetCodeStats };