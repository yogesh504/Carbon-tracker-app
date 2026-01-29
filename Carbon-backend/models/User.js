const mongoose = require("mongoose"); // ✅ Add this line at the top

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    default: null
  },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true
  },
  password: {
    type: String,
    default: null
  },
  hasLoggedIn: {
    type: Boolean,
    default: false,
  },
  goal: {
    type: Number,
    default: 100, // kg CO₂ target per week or month
  },
  weeklyGoal: {
    type: Number,
    default: 50 // Default weekly CO₂ goal in kg
  },
  
  // OTP-based email verification fields
  otp: {
    type: String,
    default: null
  },
  otpExpiry: {
    type: Date,
    default: null
  },
  isVerified: {
    type: Boolean,
    default: false
  }
  
}, { timestamps: true });


module.exports = mongoose.model("User", userSchema);
