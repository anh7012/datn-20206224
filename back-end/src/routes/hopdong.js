const express = require('express')
const router = express.Router()

const HopDongController = require('../controllers/HopDongController')
const {verifyToken} = require("../middlewares/authenToken");
const {checkPermisson} = require("../middlewares/Authorization");


router.post('/createHopDong',verifyToken,checkPermisson, HopDongController.createHopDong)
router.get('/:id/inforHopDong',verifyToken,checkPermisson, HopDongController.inforHopDong)
router.get('/listHopDong', verifyToken,checkPermisson,HopDongController.listHopDong)

module.exports = router
