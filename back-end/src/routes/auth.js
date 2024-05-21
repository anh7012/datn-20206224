const express = require("express");
const router = express.Router();
const authController = require("../controllers/AuthController");
const {verifyToken} = require("../middlewares/authenToken");

// Login
router.post("/login", authController.login);

// Refresh Token
router.post("/refresh", authController.reqRefreshToken);

// Log out
router.post("/logout", verifyToken,authController.logout);


module.exports = router;
