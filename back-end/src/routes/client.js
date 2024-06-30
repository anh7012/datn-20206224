const express = require('express')
const router = express.Router()

const ClientController = require('../controllers/ClientController')
const {verifyToken} = require("../middlewares/authenToken");
const {checkPermisson} = require("../middlewares/Authorization");

router.post('/loaiKH', verifyToken,checkPermisson, ClientController.getLoaiKH)
router.post('/createClient', verifyToken,checkPermisson, ClientController.createClient)
router.put('/:id/updateClient', verifyToken,checkPermisson, ClientController.updateClient)
router.get('/:id/inforClient', verifyToken,checkPermisson, ClientController.inforClient)
router.get('/:id/listAccount', verifyToken,checkPermisson, ClientController.listAccount)
router.get('/listClient', verifyToken,checkPermisson, ClientController.listClient)

module.exports = router