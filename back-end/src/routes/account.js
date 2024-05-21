const express = require('express')
const router = express.Router()

const AccountController = require('../controllers/AccountController')

router.post('/create', AccountController.createAccount)

router.get('/', AccountController.listAccount)

module.exports = router