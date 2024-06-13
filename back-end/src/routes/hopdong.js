const express = require('express')
const router = express.Router()

const HopDongController = require('../controllers/HopDongController')
const {verifyToken} = require("../middlewares/authenToken");



// router.post('/createHopDong',verifyToken, HopDongController.createHopDong)
// router.put('/:id/updateHopDong',verifyToken, HopDongController.updateHopDong)
// router.get('/:id/inforHopDong',verifyToken, HopDongController.inforHopDong)
// router.get('/listHopDong', verifyToken,HopDongController.listHopDong)

module.exports = router
