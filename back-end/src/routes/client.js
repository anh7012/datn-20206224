const express = require('express')
const router = express.Router()

const ClientController = require('../controllers/ClientController')
const {verifyToken} = require("../middlewares/authenToken");

router.post('/themkhachhang',verifyToken, ClientController.createClient)
router.put('/:id/suakhachhang',verifyToken, ClientController.updateClient)
router.get('/', verifyToken,ClientController.listClient)

module.exports = router