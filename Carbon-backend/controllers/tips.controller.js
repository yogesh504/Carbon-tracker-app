// server/controllers/tips.controller.js
const Tip = require("../models/Tip");

exports.getTips = async (req, res) => {
  try {
    const { category } = req.query;
    let tips;

    if (category) {
      tips = await Tip.find({ category });
    } else {
      tips = await Tip.find();
    }

    res.json(tips);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch tips" });
  }
};
