const cron = require("node-cron");
const User = require("../models/User");
const { getLeetCodeStats } = require("../services/leetcodeService");
const { getGithubStats } = require("../services/githubService");
const { getCodeforcesStats } = require("../services/codeforcesService");
const { getCodechefStats } = require("../services/codechefService");
const { getHackerrankStats } = require("../services/hackerrankService");

const syncAllUsers = async () => {
    console.log(`[SyncJob] Starting platform sync at ${new Date().toISOString()}`);

    try {
        const users = await User.find({
            $or: [
                { "platforms.leetcode.username": { $exists: true, $ne: "" } },
                { "platforms.github.username": { $exists: true, $ne: "" } },
                { "platforms.codeforces.username": { $exists: true, $ne: "" } },
                { "platforms.codechef.username": { $exists: true, $ne: "" } },
                { "platforms.hackerrank.username": { $exists: true, $ne: "" } }
            ]
        });

        console.log(`[SyncJob] Found ${users.length} user(s) to sync`);

        for (const user of users) {
            try {
                const lcUser = user.platforms.leetcode?.username;
                const ghUser = user.platforms.github?.username;
                const cfUser = user.platforms.codeforces?.username;
                const ccUser = user.platforms.codechef?.username;
                const hrUser = user.platforms.hackerrank?.username;

                // Use allSettled so one failure doesn't stop the rest
                const [lc, gh, cf, cc, hr] = await Promise.allSettled([
                    lcUser ? getLeetCodeStats(lcUser) : Promise.resolve(null),
                    ghUser ? getGithubStats(ghUser) : Promise.resolve(null),
                    cfUser ? getCodeforcesStats(cfUser) : Promise.resolve(null),
                    ccUser ? getCodechefStats(ccUser) : Promise.resolve(null),
                    hrUser ? getHackerrankStats(hrUser) : Promise.resolve(null)
                ]);

                const getValue = (result) =>
                    result.status === "fulfilled" ? result.value : null;

                const lcStats = getValue(lc);
                const ghStats = getValue(gh);
                const cfStats = getValue(cf);
                const ccStats = getValue(cc);
                const hrStats = getValue(hr);

                if (lcStats) {
                    user.platforms.leetcode = { ...user.platforms.leetcode.toObject(), ...lcStats, lastSynced: new Date() };
                }
                if (ghStats) {
                    user.platforms.github = { ...user.platforms.github.toObject(), ...ghStats, lastSynced: new Date() };
                }
                if (cfStats) {
                    user.platforms.codeforces = { ...user.platforms.codeforces.toObject(), ...cfStats, lastSynced: new Date() };
                }
                if (ccStats) {
                    user.platforms.codechef = { ...user.platforms.codechef.toObject(), ...ccStats, lastSynced: new Date() };
                }
                if (hrStats) {
                    user.platforms.hackerrank = { ...user.platforms.hackerrank.toObject(), ...hrStats, lastSynced: new Date() };
                }

                await user.save();
                console.log(`[SyncJob] Synced user: ${user.email}`);

            } catch (userError) {
                console.error(`[SyncJob] Failed to sync user ${user.email}:`, userError.message);
            }
        }

        console.log(`[SyncJob] Sync completed at ${new Date().toISOString()}`);

    } catch (error) {
        console.error("[SyncJob] Fatal error during sync:", error.message);
    }
};

const startSyncJob = () => {
    // Run every 6 hours
    cron.schedule("0 */6 * * *", syncAllUsers);
    console.log("[SyncJob] Scheduled every 6 hours");
};

module.exports = { startSyncJob };
