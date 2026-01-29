const express = require("express");
const router = express.Router();
const { getMonthlyOffset, generateMonthlyReport } = require("../controllers/offset.controller");
const verifyToken = require("../middleware/authMiddleware");

router.get("/summary", verifyToken, getMonthlyOffset);
router.get("/report", verifyToken, generateMonthlyReport);

module.exports = router;
