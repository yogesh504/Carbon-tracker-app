const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");
const {
  getAchievements
} = require("../controllers/achievement.controller");

// Get all achievements for logged-in user
router.get("/", verifyToken, getAchievements);

module.exports = router;
