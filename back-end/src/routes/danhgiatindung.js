const express = require('express')
const router = express.Router()

const DGTDController = require('../controllers/DGTDController')
const {verifyToken} = require("../middlewares/authenToken");

router.get('/:id/findDanhGia',verifyToken, DGTDController.findDanhGia)
router.get('/:idClient/listVay',verifyToken, DGTDController.listVay)
router.get('/:idHoSo/tyleThuNo',verifyToken, DGTDController.tyleThuNo)
router.get('/:idClient/TrungBinhVay',verifyToken, DGTDController.TrungBinhVay)
router.get('/:idClient/PhanPhoiLoaiGD',verifyToken, DGTDController.PhanPhoiLoaiGD)
router.get('/:idClient/ParetoThoiHan',verifyToken, DGTDController.ParetoThoiHan)
// router.get('/:idClient/PhanPhoiPhuongThucGD',verifyToken, DGTDController.PhanPhoiPhuongThucGD)
router.post('/createDanhGia',verifyToken, DGTDController.createDanhGia)
router.get('/listDanhGia',verifyToken, DGTDController.listDanhGia)


module.exports = router