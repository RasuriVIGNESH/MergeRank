const axios = require("axios");

const getHackerrankStats = async (username) => {
    try {

        // Correct working endpoint: rest/hackers/{username} (without /profile)
        const url = `https://www.hackerrank.com/rest/hackers/${username}`;

        const response = await axios.get(url, {
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
                "Accept": "application/json, text/plain, */*",
                "Referer": "https://www.hackerrank.com/"
            }
        });

        const data = response.data.model;

        if (!data) {
            console.warn(`HackerRank: No model data returned for username "${username}"`);
            return null;
        }

        return {
            username: data.username || username,
            name: data.name || null,
            country: data.country || null,
            school: data.school || null,
            rank: data.rank || null,
            company: data.company || null
        };

    } catch (error) {
        if (error.response?.status === 404) {
            console.error(`HackerRank: Username "${username}" not found (404).`);
        } else {
            console.error("HackerRank API error:", error.message);
            if (error.response) {
                console.error("HackerRank response status:", error.response.status);
                console.error("HackerRank response data:", JSON.stringify(error.response.data));
            }
        }
        return null;
    }
};

module.exports = { getHackerrankStats };