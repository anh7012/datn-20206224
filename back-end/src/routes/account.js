const express = require('express')
const router = express.Router()

const AccountController = require('../controllers/AccountController')

router.get('/', AccountController.list)

module.exports = router