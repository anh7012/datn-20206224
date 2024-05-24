const express = require('express')
const router = express.Router()

const ClientController = require('../controllers/ClientController')
const {verifyToken} = require("../middlewares/authenToken");

router.post('/createClient',verifyToken, ClientController.createClient)
router.put('/:id/updateClient',verifyToken, ClientController.updateClient)
router.get('/listClient', verifyToken,ClientController.listClient)

module.exports = router