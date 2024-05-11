const express = require('express')
const router = express.Router()

const HopDongController = require('../controllers/HopDongController')

router.get('/', HopDongController.list)

module.exports = router
