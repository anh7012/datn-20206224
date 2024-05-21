const express = require('express')
const router = express.Router()

const HopDongController = require('../controllers/HopDongController')
const {verifyToken} = require("../middlewares/authenToken");

router.get('/',verifyToken, HopDongController.list)

module.exports = router
