const User = require("../models/User");
const bcrypt = require("bcryptjs");

const seedMentorRole = async () => {
    try {
        const mentorEmail = "Mentor@woxsen.com";
        const mentorPassword = "Mentor@123";

        const mentorExists = await User.findOne({ email: mentorEmail });

        if (!mentorExists) {
            console.log("Seeding default mentor user...");
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(mentorPassword, salt);

            await User.create({
                name: "Admin Mentor",
                email: mentorEmail,
                password: hashedPassword,
                role: "mentor",
                college: "Woxsen",
                batch: "Global"
            });
            console.log(`Default mentor created! Email: ${mentorEmail} | Password: ${mentorPassword}`);
        } else {
            console.log(`Default mentor already exists (${mentorEmail}).`);
        }
    } catch (error) {
        console.error("Error seeding default mentor:", error);
    }
};

module.exports = seedMentorRole;
