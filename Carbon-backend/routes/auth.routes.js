const express = require("express");
const router = express.Router();

const {
  sendOtp,
  verifyOtp,
  register,
  login,
  forgotPasswordOtp,
  verifyForgotOtp,
  resetPassword
} = require("../controllers/auth.controller");

router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);
router.post("/register", register);
router.post("/login", login);
router.post("/forgot-password", forgotPasswordOtp);
router.post("/verify-forgot-otp", verifyForgotOtp);
router.post("/reset-password", resetPassword);

module.exports = router;
