const express = require('express');
const router = express.Router();

const hosoController = require('../controllers/HoSoController')
const {verifyToken} = require("../middlewares/authenToken");


router.post('/createHoSo',verifyToken, hosoController.createHoSo)
router.post('/createMHBIDVAndEY',verifyToken, hosoController.createMHBIDVAndEY)
// router.post('/themhoso/kntn',verifyToken, hosoController.createMHEY)
router.get('/listHoSo',verifyToken, hosoController.listHoSo)

module.exports = router