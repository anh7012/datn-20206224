const express = require('express');
const router = express.Router();

const hosoController = require('../controllers/HoSoController')
const {verifyToken} = require("../middlewares/authenToken");
const fileParse = require("../middlewares/uploadFiles");


router.post('/createHoSo',verifyToken, hosoController.createHoSo)
router.post('/:idHoSo/uploadFiles',verifyToken, fileParse, hosoController.uploadFiles)
router.get('/:idHoSo/getFiles',verifyToken,fileParse, hosoController.getFiles)
router.post('/createMHBIDVAndEY',verifyToken, hosoController.createMHBIDVAndEY)
router.get('/:id/inforHoSo',verifyToken, hosoController.getInforHoSo)
router.put('/:id/updateHoSo',verifyToken, hosoController.updateHoSo)
router.put('/:id/updateTrangThai',verifyToken, hosoController.updateTrangThai)
router.get('/listHoSo',verifyToken, hosoController.listHoSo)



module.exports = router