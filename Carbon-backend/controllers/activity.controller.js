// controllers/activity.controller.js
const Activity = require("../models/Activity");
const User = require("../models/User");

// Helper: Get start of current week (Sunday-based for consistency)
const getStartOfWeek = () => {
  const startOfWeek = new Date();
  startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
  startOfWeek.setHours(0, 0, 0, 0);
  return startOfWeek;
};

// Helper: Get end of current week
const getEndOfWeek = () => {
  const endOfWeek = new Date();
  endOfWeek.setDate(endOfWeek.getDate() + (6 - endOfWeek.getDay()));
  endOfWeek.setHours(23, 59, 59, 999);
  return endOfWeek;
};

// Helper: Get dynamic eco title based on rank and weekly performance
// Returns a title for leaderboard display (not stored in DB)
const getEcoTitle = (rank, weeklyStatus, activityCount) => {
  if (rank === 1) {
    return "Eco Champion";
  }
  if (weeklyStatus === "under") {
    return "Eco Warrior";
  }
  if (activityCount >= 5) {
    return "Eco Explorer";
  }
  return "Eco Beginner";
};

const getWeeklySummary = async (req, res) => {
  try {
    const userId = req.user.id;

    // Get start of current week
    const startOfWeek = getStartOfWeek();

    const activities = await Activity.find({
      user: userId,
      createdAt: { $gte: startOfWeek },
    });

    const total = activities.reduce((sum, act) => sum + act.carbonFootprint, 0);

    const user = await User.findById(userId); // ✅ Fetch latest goal

    const goal = user.weeklyGoal || 100; // Default goal if not set
    const status = total <= goal ? "under" : "over";

    res.json({ total: total.toFixed(2), goal, status });
  } catch (err) {
    console.error("Weekly summary error:", err);
    res.status(500).json({ message: "Error getting weekly summary" });
  }
};

// Leaderboard with dynamic eco titles
const getLeaderboard = async (req, res) => {
  try {
    const startOfWeek = getStartOfWeek();
    const endOfWeek = getEndOfWeek();

    // Get all users with their weekly activities
    const leaderboardData = await Activity.aggregate([
      {
        $match: {
          createdAt: { $gte: startOfWeek, $lte: endOfWeek }
        }
      },
      {
        $group: {
          _id: "$user",
          totalCO2: { $sum: "$carbonFootprint" },
          activityCount: { $sum: 1 }
        }
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "userInfo"
        }
      },
      {
        $unwind: "$userInfo"
      },
      {
        $project: {
          _id: 1,
          name: "$userInfo.name",
          totalCO2: 1,
          activityCount: 1,
          weeklyGoal: "$userInfo.weeklyGoal"
        }
      },
      {
        $sort: { totalCO2: 1 } // Lower emissions = better rank
      }
    ]);

    // Add rank and eco title to each user
    const leaderboard = leaderboardData.map((user, index) => {
      const rank = index + 1;
      const weeklyGoal = user.weeklyGoal || 100;
      const weeklyStatus = user.totalCO2 <= weeklyGoal ? "under" : "over";
      const ecoTitle = getEcoTitle(rank, weeklyStatus, user.activityCount);

      return {
        _id: user._id,
        name: user.name,
        totalCO2: user.totalCO2,
        rank,
        ecoTitle
      };
    });

    res.json(leaderboard);
  } catch (err) {
    console.error("Leaderboard error:", err);
    res.status(500).json({ message: "Failed to fetch leaderboard" });
  }
};

module.exports = { getWeeklySummary, getLeaderboard, getEcoTitle };
