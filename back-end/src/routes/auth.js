const express = require("express");
const router = express.Router();

const authController = require("../controllers/AuthController");
const authenToken = require("../middlewares/authenToken");

// Login
router.post("/login", authController.login);

// Refresh Token
router.post("/refresh", authController.reqRefreshToken);

// Log out
router.post("/logout", authenToken.verifyToken,authController.logout);


module.exports = router;
