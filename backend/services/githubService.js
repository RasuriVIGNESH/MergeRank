const axios = require("axios");

const getGithubStats = async (username) => {
    try {

        const headers = {
            Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
            "User-Agent": "MergeRank-App"
        };

        const userRes = await axios.get(
            `https://api.github.com/users/${username}`,
            { headers }
        );

        const reposRes = await axios.get(
            `https://api.github.com/users/${username}/repos?per_page=100`,
            { headers }
        );

        const repos = reposRes.data;

        let totalStars = 0;
        let languages = {};

        repos.forEach(repo => {
            totalStars += repo.stargazers_count;

            if (repo.language) {
                languages[repo.language] =
                    (languages[repo.language] || 0) + 1;
            }
        });

        let totalContributions = 0;
        let contributionCalendar = null;

        try {

            const year = new Date().getFullYear();

            const query = `
            query getGithubStats($username: String!) {
              user(login: $username) {
                contributionsCollection(
                  from: "${year}-01-01T00:00:00Z"
                  to: "${year}-12-31T23:59:59Z"
                ) {
                  contributionCalendar {
                    totalContributions
                    weeks {
                      contributionDays {
                        date
                        contributionCount
                      }
                    }
                  }
                }
              }
            }
            `;

            const graphRes = await axios.post(
                "https://api.github.com/graphql",
                { query, variables: { username } },
                { headers }
            );

            const calendar = graphRes.data?.data?.user?.contributionsCollection?.contributionCalendar;
            totalContributions = calendar?.totalContributions || 0;
            contributionCalendar = calendar;

        } catch (gqlError) {
            console.error("GitHub GraphQL API error:", gqlError.message);
        }

        return {
            username,
            publicRepos: userRes.data.public_repos,
            followers: userRes.data.followers,
            following: userRes.data.following,
            totalStars,
            languages,
            totalContributions,
            contributionCalendar
        };

    } catch (error) {
        console.error("GitHub API error:", error.message);
        return null;
    }
};

const getGithubContributionCalendar = async (username) => {
    try {
        const headers = {
            Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
            "User-Agent": "MergeRank-App"
        };

        const year = new Date().getFullYear();

        const query = `
        query getContributionCalendar($username: String!) {
          user(login: $username) {
            contributionsCollection(
              from: "${year}-01-01T00:00:00Z"
              to: "${year}-12-31T23:59:59Z"
            ) {
              contributionCalendar {
                totalContributions
                weeks {
                  contributionDays {
                    date
                    contributionCount
                  }
                }
              }
            }
          }
        }
        `;

        const graphRes = await axios.post(
            "https://api.github.com/graphql",
            { query, variables: { username } },
            { headers }
        );

        return graphRes.data?.data?.user?.contributionsCollection?.contributionCalendar || null;

    } catch (error) {
        console.error("GitHub Contribution Calendar API error:", error.message);
        return null;
    }
};

module.exports = { getGithubStats, getGithubContributionCalendar };