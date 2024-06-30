const express = require('express')
const router = express.Router()

const DGTDController = require('../controllers/DGTDController')
const {verifyToken} = require("../middlewares/authenToken");
const {checkPermisson} = require("../middlewares/Authorization");

router.get('/:id/findDanhGia',verifyToken,checkPermisson, DGTDController.findDanhGia)
router.get('/:idClient/listVay',verifyToken,checkPermisson, DGTDController.listVay)
router.get('/:idHoSo/tyleThuNo',verifyToken,checkPermisson, DGTDController.tyleThuNo)
router.get('/:idClient/TrungBinhVay',verifyToken,checkPermisson, DGTDController.TrungBinhVay)
router.get('/:idClient/PhanPhoiLoaiGD',verifyToken,checkPermisson, DGTDController.PhanPhoiLoaiGD)
router.get('/:idClient/ParetoThoiHan',verifyToken,checkPermisson, DGTDController.ParetoThoiHan)
router.get('/:idClient/PhanPhoiPhuongThucGD',verifyToken,checkPermisson, DGTDController.PhanPhoiPhuongThucGD)
router.post('/createDanhGia',verifyToken,checkPermisson, DGTDController.createDanhGia)
router.get('/listDanhGia',verifyToken,checkPermisson, DGTDController.listDanhGia)


module.exports = router