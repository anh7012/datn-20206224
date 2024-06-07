const express = require('express');
const router = express.Router();

const hosoController = require('../controllers/HoSoController')
const {verifyToken} = require("../middlewares/authenToken");

router.get('/loaiKH',verifyToken, hosoController.createHoSo)
router.post('/createHoSo',verifyToken, hosoController.createHoSo)
router.post('/createMHBIDVAndEY',verifyToken, hosoController.createMHBIDVAndEY)
router.get('/listHoSo',verifyToken, hosoController.listHoSo)

module.exports = router