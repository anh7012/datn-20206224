const express = require('express')
const router = express.Router()

const DGTDController = require('../controllers/DGTDController')

router.get('/', DGTDController.list)

module.exports = router