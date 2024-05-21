const express = require('express')
const router = express.Router()

const DGTDController = require('../controllers/DGTDController')

router.get('/', DGTDController.findDanhGia)
router.post('/create', DGTDController.createDanhGia)
router.get('/', DGTDController.listDanhGia)
router.get('/test', DGTDController.test)

module.exports = router