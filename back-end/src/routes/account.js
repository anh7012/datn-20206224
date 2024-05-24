const express = require('express')
const router = express.Router()

const AccountController = require('../controllers/AccountController')
const {verifyToken} = require("../middlewares/authenToken");

router.post('/createAccount', verifyToken,AccountController.createAccount)

router.get('/listAccount',verifyToken, AccountController.listAccount)

module.exports = router