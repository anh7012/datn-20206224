const express = require('express')
const router = express.Router()

const DGTDController = require('../controllers/DGTDController')
const {verifyToken} = require("../middlewares/authenToken");

router.get('/findDanhGia',verifyToken, DGTDController.findDanhGia)
router.post('/createDanhGia',verifyToken, DGTDController.createDanhGia)
// router.post('/inforDanhGia',verifyToken, DGTDController.inforDanhGia)
router.get('/listDanhGia',verifyToken, DGTDController.listDanhGia)
// router.get('/test', DGTDController.test)

module.exports = router