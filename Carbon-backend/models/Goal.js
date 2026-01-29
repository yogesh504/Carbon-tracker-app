const mongoose = require("mongoose");

const goalSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  weeklyGoal: { type: Number, required: true }, // in kg CO₂
}, { timestamps: true });

module.exports = mongoose.model("Goal", goalSchema);
