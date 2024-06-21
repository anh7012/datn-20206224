const express = require('express')
const router = express.Router()

const ClientController = require('../controllers/ClientController')
const {verifyToken} = require("../middlewares/authenToken");
const hosoController = require("../controllers/HoSoController");

router.post('/loaiKH', verifyToken, ClientController.getLoaiKH)
router.post('/createClient', verifyToken, ClientController.createClient)
router.put('/:id/updateClient', verifyToken, ClientController.updateClient)
router.get('/:id/inforClient', verifyToken, ClientController.inforClient)
router.get('/:id/listAccount', verifyToken, ClientController.listAccount)
router.get('/listClient', verifyToken, ClientController.listClient)

module.exports = router