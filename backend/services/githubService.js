const axios = require("axios");

const getGithubStats = async (username) => {
    try {

        const userRes = await axios.get(`https://api.github.com/users/${username}`);

        const reposRes = await axios.get(`https://api.github.com/users/${username}/repos`);

        const repos = reposRes.data;

        let totalStars = 0;
        let languages = {};

        repos.forEach(repo => {
            totalStars += repo.stargazers_count;

            if (repo.language) {
                languages[repo.language] = (languages[repo.language] || 0) + 1;
            }
        });

        return {
            username,
            publicRepos: userRes.data.public_repos,
            followers: userRes.data.followers,
            following: userRes.data.following,
            totalStars,
            languages
        };

    } catch (error) {
        console.error("GitHub API error:", error.message);
        return null;
    }
};

module.exports = { getGithubStats };