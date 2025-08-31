const express = require('express');
const router = express.Router();
const authController = require('../Controllers/Auth');

// =================== Auth Routes ===================

// Register user (send OTP to email)
router.post('/register', authController.register);

// Verify email OTP
router.post('/verify-otp', authController.verifyOTP);

// Login
router.post('/login', authController.login);

// Forgot password (send reset OTP)
router.post('/forgot-password', authController.forgotPassword);

// Verify reset OTP
router.post('/verify-reset-otp', authController.verifyResetOTP);

// Reset password
router.post('/reset-password', authController.resetPassword);

module.exports = router;
