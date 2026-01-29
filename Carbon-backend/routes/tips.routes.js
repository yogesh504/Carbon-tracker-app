// server/routes/tips.routes.js
const express = require("express");
const router = express.Router();
const { getTips } = require("../controllers/tips.controller");

router.get("/", getTips); // Public route

module.exports = router;
