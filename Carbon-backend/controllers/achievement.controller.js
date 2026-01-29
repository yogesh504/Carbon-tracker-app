const Achievement = require("../models/Achievement");
const User = require("../models/User");
const Activity = require("../models/Activity");

// Helper: Get start and end of current week (Monday to Sunday)
const getCurrentWeekRange = () => {
  const now = new Date();
  const dayOfWeek = now.getDay();
  const diffToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
  
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - diffToMonday);
  startOfWeek.setHours(0, 0, 0, 0);
  
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  endOfWeek.setHours(23, 59, 59, 999);
  
  return { startOfWeek, endOfWeek };
};

// Helper: Get start and end of previous week (for Weekly Champion validation)
const getPreviousWeekRange = () => {
  const now = new Date();
  const dayOfWeek = now.getDay();
  const diffToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
  
  const startOfCurrentWeek = new Date(now);
  startOfCurrentWeek.setDate(now.getDate() - diffToMonday);
  startOfCurrentWeek.setHours(0, 0, 0, 0);
  
  const startOfPrevWeek = new Date(startOfCurrentWeek);
  startOfPrevWeek.setDate(startOfCurrentWeek.getDate() - 7);
  
  const endOfPrevWeek = new Date(startOfPrevWeek);
  endOfPrevWeek.setDate(startOfPrevWeek.getDate() + 6);
  endOfPrevWeek.setHours(23, 59, 59, 999);
  
  return { startOfPrevWeek, endOfPrevWeek };
};

// Helper: Get week identifier string for a given date (e.g., "2025-W51")
const getWeekIdentifier = (date = new Date()) => {
  const startOfYear = new Date(date.getFullYear(), 0, 1);
  const days = Math.floor((date - startOfYear) / (24 * 60 * 60 * 1000));
  const weekNumber = Math.ceil((days + startOfYear.getDay() + 1) / 7);
  return `${date.getFullYear()}-W${weekNumber.toString().padStart(2, '0')}`;
};

// Get all achievements for the logged-in user (includes dynamic badges)
exports.getAchievements = async (req, res) => {
  try {
    const userId = req.user.id;

    // Fetch permanent achievements from DB
    const permanentAchievements = await Achievement.find({ user: userId });

    // Compute dynamic "Going Green" badge
    const dynamicAchievements = [];
    
    const { startOfWeek, endOfWeek } = getCurrentWeekRange();
    const user = await User.findById(userId);
    
    // "Going Green" badge - dynamic, computed on the fly
    // Only consider activities logged AFTER the weekly goal was set AND within current week
    if (user.weeklyGoal != null && user.weeklyGoalSetAt != null) {
      // Determine the effective start date: later of (start of week, goal set date)
      const effectiveStartDate = new Date(Math.max(
        startOfWeek.getTime(),
        new Date(user.weeklyGoalSetAt).getTime()
      ));

      // Get activities logged after goal was set AND within current week
      const qualifyingActivities = await Activity.find({
        user: userId,
        createdAt: {
          $gte: effectiveStartDate,
          $lte: new Date()
        }
      });

      // Calculate emissions only from qualifying activities
      const qualifyingEmissions = qualifyingActivities.reduce(
        (sum, activity) => sum + (activity.carbonFootprint || 0), 0
      );

      // Show badge only if user has qualifying activities and is under goal
      if (qualifyingActivities.length > 0 && qualifyingEmissions <= user.weeklyGoal) {
        dynamicAchievements.push({
          _id: "dynamic-going-green",
          user: userId,
          title: "Going Green",
          description: `You're staying under your weekly goal! Current: ${qualifyingEmissions.toFixed(2)} kg / Goal: ${user.weeklyGoal} kg`,
          achievedAt: new Date(),
          isDynamic: true // Flag to indicate this is not stored in DB
        });
      }
    }

    // Combine permanent and dynamic achievements
    const allAchievements = [...dynamicAchievements, ...permanentAchievements];

    // Sort all achievements by achievedAt in descending order
    allAchievements.sort((a, b) => new Date(b.achievedAt) - new Date(a.achievedAt));

    res.json({
      success: true,
      achievements: allAchievements
    });
  } catch (err) {
    console.error("GET ACHIEVEMENTS ERROR:", err);
    res.status(500).json({
      success: false,
      message: "Error fetching achievements",
      error: err.message
    });
  }
};

// Helper function to create a permanent achievement (used by activity/goal controllers)
// Prevents duplicate achievements for the same user and title
exports.createAchievement = async (userId, title, description) => {
  try {
    // Check if achievement already exists for this user
    const existingAchievement = await Achievement.findOne({
      user: userId,
      title: title
    });

    if (existingAchievement) {
      // Achievement already exists, do not create duplicate
      return null;
    }

    // Create new achievement
    const achievement = new Achievement({
      user: userId,
      title,
      description,
      achievedAt: new Date()
    });

    await achievement.save();
    return achievement;
  } catch (err) {
    console.error("CREATE ACHIEVEMENT ERROR:", err);
    throw err;
  }
};

// Award "First Login" badge - call this from login controller
exports.awardFirstLoginBadge = async (userId) => {
  return await exports.createAchievement(
    userId,
    "First Login",
    "Welcome! You've successfully logged in for the first time."
  );
};

// Award "Weekly Champion" badge - ONLY after the previous week has fully ended
// Call this on login or activity creation to check for pending awards
// Ensures badge is granted only once per week using week-based identifier
exports.awardWeeklyChampionBadge = async (userId) => {
  try {
    const { startOfPrevWeek, endOfPrevWeek } = getPreviousWeekRange();
    const prevWeekId = getWeekIdentifier(startOfPrevWeek);
    const badgeTitle = `Weekly Champion - ${prevWeekId}`;

    // Check if badge for previous week already awarded
    const existingBadge = await Achievement.findOne({
      user: userId,
      title: badgeTitle
    });

    if (existingBadge) {
      return null; // Already awarded for this week
    }

    const user = await User.findById(userId);

    // Do NOT award if user has no weekly goal set
    if (user.weeklyGoal == null) {
      return null; // No weekly goal configured
    }

    // Get all activities for the PREVIOUS week (fully completed)
    const prevWeekActivities = await Activity.find({
      user: userId,
      createdAt: {
        $gte: startOfPrevWeek,
        $lte: endOfPrevWeek
      }
    });

    // Only award if user logged activities during the previous week
    if (prevWeekActivities.length === 0) {
      return null; // No activities logged in previous week
    }

    // Calculate total emissions for the previous week
    const prevWeekEmissions = prevWeekActivities.reduce(
      (sum, activity) => sum + (activity.carbonFootprint || 0), 0
    );

    // Check if user stayed under goal for the entire week
    if (prevWeekEmissions > user.weeklyGoal) {
      return null; // Exceeded weekly goal
    }

    // Award the badge (createAchievement handles duplicate check)
    return await exports.createAchievement(
      userId,
      badgeTitle,
      `Stayed under your weekly goal of ${user.weeklyGoal} kg CO₂ for week ${prevWeekId}. Total emissions: ${prevWeekEmissions.toFixed(2)} kg.`
    );
  } catch (err) {
    console.error("WEEKLY CHAMPION BADGE ERROR:", err);
    throw err;
  }
};
  

console.log("Achievement controller loaded");