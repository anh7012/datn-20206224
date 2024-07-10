const express = require('express');
const router = express.Router();

const hosoController = require('../controllers/HoSoController')
const {verifyToken} = require("../middlewares/authenToken");
const fileParse = require("../middlewares/uploadFiles");
const {checkPermisson} = require("../middlewares/Authorization");


router.post('/createHoSo',verifyToken,checkPermisson, hosoController.createHoSo)
<<<<<<< HEAD
router.post('/:idHoSo/uploadFiles',verifyToken,checkPermisson, hosoController.uploadFiles)
=======
router.post('/:idHoSo/uploadFiles',verifyToken,checkPermisson,fileParse, hosoController.uploadFiles)
>>>>>>> origin/main
router.get('/:idHoSo/getFiles',verifyToken,checkPermisson,fileParse, hosoController.getFiles)
router.post('/createMHBIDVAndEY',verifyToken,checkPermisson, hosoController.createMHBIDVAndEY)
router.get('/:id/inforHoSo',verifyToken,checkPermisson, hosoController.getInforHoSo)
router.put('/:id/updateHoSo',verifyToken,checkPermisson, hosoController.updateHoSo)
router.put('/:id/updateTrangThai',verifyToken,checkPermisson, hosoController.updateTrangThai)
router.get('/listHoSo',verifyToken,checkPermisson, hosoController.listHoSo)



module.exports = router