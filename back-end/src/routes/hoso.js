const express = require('express');
const router = express.Router();

const hosoController = require('../controllers/HoSoController')
const {verifyToken} = require("../middlewares/authenToken");


router.post('/themhoso/thongtin',verifyToken, hosoController.createHoSo)
router.post('/themhoso/tsdb',verifyToken, hosoController.createMHBIDV)
router.post('/themhoso/kntn',verifyToken, hosoController.createMHEY)
router.get('/',verifyToken, hosoController.listHoSo)

module.exports = router