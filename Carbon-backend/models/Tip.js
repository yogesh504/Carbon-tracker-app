// server/models/Tip.js
const mongoose = require("mongoose");

const tipSchema = new mongoose.Schema({
  category: {
    type: String,
    enum: ["transport", "electricity", "diet", "general"],
    required: true
  },
  message: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Tip", tipSchema);
