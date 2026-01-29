// server/seedTips.js
const mongoose = require("mongoose");
const Tip = require("./models/Tip");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    await Tip.deleteMany();
    await Tip.insertMany([
      { category: "transport", message: "Try carpooling to reduce emissions." },
      { category: "electricity", message: "Switch to LED bulbs to save energy." },
      { category: "diet", message: "Eat more plant-based meals for lower CO₂." },
      { category: "general", message: "Recycle and reuse to cut down waste." }
    ]);
    console.log("Tips seeded successfully!");
    mongoose.disconnect();
  })
  .catch(console.error);
