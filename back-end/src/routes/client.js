const express = require('express')
const router = express.Router()

const ClientController = require('../controllers/ClientController')
const validate = require("../middlewares/validator");

router.post('/themkhachhang',validate.validateEmail, ClientController.createClient)
router.put('/:id/suakhachhang', ClientController.updateClient)
router.get('/', ClientController.listClient)

module.exports = router