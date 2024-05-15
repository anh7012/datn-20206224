const express = require('express');
const router = express.Router();

const hosoController = require('../controllers/HoSoController')


router.post('/themhoso', hosoController.createHoSo)
router.get('/', hosoController.listHoSo)

module.exports = router