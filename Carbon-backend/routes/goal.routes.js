const express = require("express");
const router = express.Router();
const Goal = require("../models/Goal");
const verifyToken = require("../middleware/authMiddleware");

// Set or update goal
router.post("/", verifyToken, async (req, res) => {
  const { weeklyGoal } = req.body;
  try {
    const existing = await Goal.findOne({ user: req.user.id });
    if (existing) {
      existing.weeklyGoal = weeklyGoal;
      await existing.save();
      return res.json({ message: "Goal updated", goal: existing });
    }
    const newGoal = await Goal.create({ user: req.user.id, weeklyGoal });
    res.json({ message: "Goal set", goal: newGoal });
  } catch (err) {
    res.status(500).json({ message: "Failed to set goal" });
  }
});

// Get current goal
router.get("/", verifyToken, async (req, res) => {
  try {
    const goal = await Goal.findOne({ user: req.user.id });
    if (!goal) return res.status(404).json({ message: "No goal set yet" });
    res.json(goal);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch goal" });
  }
});

module.exports = router;
