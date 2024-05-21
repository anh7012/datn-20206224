const express = require('express');
const router = express.Router();

const hosoController = require('../controllers/HoSoController')


router.post('/themhoso/thongtin', hosoController.createHoSo)
router.post('/themhoso/tsdb', hosoController.createMHBIDV)
router.post('/themhoso/kntn', hosoController.createMHEY)
router.get('/', hosoController.listHoSo)

module.exports = router