const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const studentRoutes = require("./routes/studentRoutes");
const leaderboardRoutes = require("./routes/leaderboardRoutes");
const batchRoutes = require("./routes/batchRoutes");
const mentorRoutes = require("./routes/mentorRoutes");
const errorHandler = require("./middleware/errorHandler");
const { startSyncJob } = require("./jobs/syncJob");
const seedMentorRole = require("./utils/seedMentor");

connectDB().then(() => {
    seedMentorRole();
});

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/leaderboard", leaderboardRoutes);
app.use("/api/batches", batchRoutes);
app.use("/api/mentor", mentorRoutes);

app.get("/", (req, res) => {
    res.send("MergeRank Backend Running 🚀");
});

// app.get("/health", (req, res) => {
//     res.send("server is running");
// });
app.get("/healthz", (req, res) => {
    res.status(200).json({ status: "ok" });
});
// Centralized error handler (must be last middleware)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    startSyncJob();
});