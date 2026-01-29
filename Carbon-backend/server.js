const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");

const tipRoutes = require("./routes/tips.routes");
const goalRoutes = require("./routes/goal.routes");
const authRoutes = require("./routes/auth.routes");
const activityRoutes = require("./routes/activity.routes");
const achievementRoutes = require("./routes/achievement.routes");
const userRoutes = require("./routes/user.routes");
const offsetRoutes = require("./routes/offset.routes");


const app = express();

// Connect to DB
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads")); // Serve profile pictures

// Routes
app.use("/api/tips", tipRoutes);
app.use("/api/goals", goalRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/activities", activityRoutes);
app.use("/api/achievements", achievementRoutes);
app.use("/api/users", userRoutes);
app.use("/api/offset", offsetRoutes);


// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
