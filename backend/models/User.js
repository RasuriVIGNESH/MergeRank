const mongoose = require("mongoose");

const platformSchema = new mongoose.Schema({
    username: String,

    totalSolved: Number,
    easy: Number,
    medium: Number,
    hard: Number,

    rating: Number,
    maxRating: Number,
    rank: String,

    publicRepos: Number,
    followers: Number,
    following: Number,
    totalStars: Number,

    stars: String,
    globalRank: String,
    countryRank: String,

    badges: Number,

    // Topic Mastery (LeetCode)
    arrays: Number,
    strings: Number,
    dp: Number,
    graphs: Number,
    trees: Number,

    // Contributions (GitHub)
    totalContributions: Number,

    lastSynced: Date
}, { _id: false });

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },

        email: {
            type: String,
            required: true,
            unique: true
        },

        password: {
            type: String,
            required: true
        },

        role: {
            type: String,
            enum: ["student", "mentor"],
            default: "student"
        },

        college: String,
        batch: String,
        gradYear: Number,
        branch: String,

        platforms: {
            leetcode: platformSchema,
            github: platformSchema,
            codeforces: platformSchema,
            codechef: platformSchema,
            hackerrank: platformSchema
        },

        aiSuggestions: [
            {
                topic: String,
                problems: [String],
                generatedAt: Date
            }
        ],
        placementScore: Number,
        activityScore: Number,
        consistencyScore: Number
    },
    { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);