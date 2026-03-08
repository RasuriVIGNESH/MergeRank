const axios = require("axios");
const cheerio = require("cheerio");

const getCodechefStats = async (username) => {
    try {

        const url = `https://www.codechef.com/users/${username}`;

        const { data } = await axios.get(url);

        const $ = cheerio.load(data);

        const rating = $(".rating-number").first().text().trim();

        const stars = $(".rating-star").first().text().trim();

        const globalRank = $("div.rating-ranks strong").first().text();

        const countryRank = $("div.rating-ranks strong").eq(1).text();

        return {
            username,
            rating: rating || null,
            stars: stars || null,
            globalRank: globalRank || null,
            countryRank: countryRank || null
        };

    } catch (error) {
        console.error("CodeChef scraping error:", error.message);
        return null;
    }
};

module.exports = { getCodechefStats };