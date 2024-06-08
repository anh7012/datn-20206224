const express = require('express');
const router = express.Router();

const hosoController = require('../controllers/HoSoController')
const {verifyToken} = require("../middlewares/authenToken");


router.post('/createHoSo',verifyToken, hosoController.createHoSo)
router.post('/createMHBIDVAndEY',verifyToken, hosoController.createMHBIDVAndEY)
router.get('/:id/inforHoSo',verifyToken, hosoController.getInforHoSo)
router.put('/:id/updateHoSo',verifyToken, hosoController.updateHoSo)
router.get('/listHoSo',verifyToken, hosoController.listHoSo)

module.exports = router