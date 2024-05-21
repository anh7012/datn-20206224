const express = require('express')
const router = express.Router()

const AccountController = require('../controllers/AccountController')
const {verifyToken} = require("../middlewares/authenToken");

router.post('/create', verifyToken,AccountController.createAccount)

router.get('/',verifyToken, AccountController.listAccount)

module.exports = router