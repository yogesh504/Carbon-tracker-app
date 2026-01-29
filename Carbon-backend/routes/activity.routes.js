const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");

const Activity = require("../models/Activity");
const Achievement = require("../models/Achievement");

// Controllers
const {
  getWeeklySummary,
  getLeaderboard
} = require("../controllers/activity.controller");

/* ============================
   LEADERBOARD
============================ */
router.get("/leaderboard", verifyToken, getLeaderboard);

/* ============================
   WEEKLY SUMMARY
============================ */
router.get("/weekly-summary", verifyToken, getWeeklySummary);

/* ============================
   EMISSION FACTORS
============================ */
const emissionFactors = {
  transport: {
    car: 0.21,
    bus: 0.1,
    bike: 0.02,
    train: 0.05
  },
  electricity: 0.7,
  diet: {
    vegetarian: 2.0,
    nonVegetarian: 4.5,
    vegan: 1.5
  }
};

/* ============================
   GET LOGGED-IN USER ACTIVITIES
============================ */
router.get("/my", verifyToken, async (req, res) => {
  try {
    const activities = await Activity.find({ user: req.user.id })
      .sort({ createdAt: -1 });

    res.json(activities);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch activities" });
  }
});

/* ============================
   ACHIEVEMENT CHECK HELPER
============================ */
const checkAndAwardAchievements = async (userId) => {
  const count = await Activity.countDocuments({ user: userId });

  const milestones = [
    { count: 1, title: "First Step", description: "Logged your first activity!" },
    { count: 5, title: "Getting Greener", description: "Logged 5 activities." },
    { count: 10, title: "Eco Tracker", description: "Logged 10 activities!" }
  ];

  for (const m of milestones) {
    const exists = await Achievement.findOne({
      user: userId,
      title: m.title
    });

    if (count >= m.count && !exists) {
      await new Achievement({
        user: userId,
        title: m.title,
        description: m.description
      }).save();
    }
  }
};

/* ============================
   POST ACTIVITY
============================ */
router.post("/", verifyToken, async (req, res) => {
  const { type, data } = req.body;
  let carbon = 0;
  let suggestion = "";

  try {
    if (type === "transport") {
      carbon = parseFloat(data.distance) * emissionFactors.transport[data.mode];
      suggestion = "Try walking, cycling, or using public transport more often.";
    } 
    else if (type === "electricity") {
      carbon = parseFloat(data.usage) * emissionFactors.electricity;
      suggestion = "Reduce electricity usage and switch to renewable sources.";
    } 
    else if (type === "diet") {
      carbon = emissionFactors.diet[data.dietType];
      suggestion = "Consider eating more plant-based meals.";
    } 
    else {
      return res.status(400).json({ message: "Invalid activity type." });
    }

    const activity = new Activity({
      user: req.user.id,
      type,
      data,
      carbonFootprint: carbon
    });

    await activity.save();
    await checkAndAwardAchievements(req.user.id);

    res.json({
      carbonFootprint: carbon.toFixed(2),
      suggestion
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error calculating footprint" });
  }
});

module.exports = router;
